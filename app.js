const express=require('express');
const app=express();
const port=5000;

const fs = require('node:fs');
const path = require('path');
const { writeFile } = require('fs/promises'); 
async function writeToFile(filepath,dateString) { 
    try { 
      await writeFile(path.join(__dirname,'Files_System',filepath), dateString) ,'utf8'; 
      console.log(`Wrote data to ${filepath}`); 
    } catch (error) { 
      console.error(`Got an error trying to write the file: ${error.message}`); 
    } 
};


const directoryPath = `${__dirname}/Files_System`
app.get("/",(req,res)=>{
  res.status(200).end("welcome!")

})


app.get('/createFile',(req,res)=>{
    const currentDate = new Date();
const currentDayOfMonth = currentDate.getDate();
const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
const currentYear = currentDate.getFullYear();
const date = `${currentDayOfMonth}-${currentMonth+1}-${currentYear}-${currentDate.getTime()}`
const dateString = (`{
    "Day": ${currentDayOfMonth}, 
    "Month":${currentMonth + 1} , 
    "Year": ${currentYear },
    "Time":${ Date.now()}
}`)
    const filepath =`${date.toString()}.txt`
    writeToFile(filepath,dateString)
    res.status(200).send(`<h1>File created at ${filepath}<h1>`)
      
})

app.get('/getFiles',(req,res)=>{
    filesInDir =fs.readdirSync(directoryPath)
    res.status(200).send(`<h1>Files in the Directory: ${filesInDir}<h1>`)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
