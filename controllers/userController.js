// the logic originally created within the routes file; better to place it in a controler named for the base URL
const uuidv4 = require('uuid').v4
const path = require('path')

require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ausnwxmfbhblkuszypky.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


const createUser = async (req, res) => {    
    const user = req.body       
    try {
        const { data, error } = await supabase
        .from('client')
        .insert([user])        
    } catch {
        res.status(501).send({"mesage": "Cannot create the user due to an unkown error"})
    }      
    res.status(201).send(user)
}

const deleteUser = async (req, res) => {
    const { id } = req.params   
    let result
    if(!id){
        res.status(400).send({"mesage": "User id required"})
        return
    }    
    try {
        const { data, error } = await supabase
        .from('client')
        .delete()
        .eq('id', id) 
        result = data
    } catch (error) {
        res.status(501).send({"mesage": "Cannot delete the user due to an unkown error"})
    }
    if(result.length === 0) {
        res.status(404).send({"mesage": "User not found"})
        return
    }

    res.status(204).send({"mesage": "user deleted"})
}

const getAllUsers = async (req, res) => {     
    try {
        const { data, error } = await supabase
        .from('client')
        .select()            
        res.status(200).send(data)
    } catch (error) {
        console.error(error)
    }     
}

const getUserById = async (req, res) => {
    const { id } = req.params
    let result
    try {
        const { data, error } = await supabase
        .from('client')
        .select() 
        .eq('id', id)           
        result = data 
    } catch (error) {
        res.status(501).send({"mesage": "Cannot retrieve the user due to an unkown error"})
    }   
    if(!result) {
        res.status(404).send({"mesage": "User not found"})
        return
    }
    res.status(200).send(result)
}

const updateUser = async (req, res) => {
    const { id } = req.params     
    let result
    try {
        const { data, error } = await supabase
        .from('client')
        .update(req.body)
        .match({id: id})
        result = data 
    } catch (error) {
        res.status(501).send({"mesage": "Cannot update the user due to an unkown error"})
    } 
    if(!result)     {
        res.status(404).send("User not found or bad request")
        return
    }
    console.table(result)
    res.status(202).send('Update received')
}


module.exports = { createUser, deleteUser, getAllUsers, getUserById, updateUser }