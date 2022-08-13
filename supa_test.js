
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ausnwxmfbhblkuszypky.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


async function getAllUsers() {    
    try {
        const { data, error } = await supabase
        .from('client')
        .select()            
        console.log(data) // list of objects
    } catch (error) {
        console.error(error)
    }   
}



async function deleteUser() {
    try {
        const { data, error } = await supabase
        .from('client')
        .delete()
        .eq('id', '3') 
        console.log(data) 
    } catch (error) {
        console.error(error)
    }   
}

async function getOneUser() {
    try {
        const { data, error } = await supabase
        .from('client')
        .select() 
        .eq('id', '4')           
        console.table(data) 
    } catch (error) {
        console.error(error)
    }   
}

async function updateUser() {
    try {
        const { data, error } = await supabase
        .from('client')
        .update({ first_name: 'Donald', age:76})
        .match({id: '4'})
        console.table(data)   
    } catch (error) {
        console.error(error)
    }    
}

async function addUser() {
    try {
        const { data, error } = await supabase
        .from('client')
        .insert([{id:'1776', first_name: 'Rocky', last_name: 'Racoon', 'age': 37}])
        console.table(data)
    } catch {
        console.error(error)
    }
}


function detect(arr) {
    if(arr.length === 0) {
        console.log('Object is empty!')
    }
    console.log('The object exists!')
}

