const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());


app.post('/upload', async (req, res)=>{

    // try{
    //         const data = req.body;
    //         let D = new Date().toISOString();
    //         data["Date"] = D; 
        
    //         fs.appendFile('logger.txt', JSON.stringify(data, null, 2) + '\n', (err)=>{
    //             if(err){
    //                 return res.status(500).json({message:err.message});
    //             }
    //             else{
    //                 return res.status(201).json({message:'Content Added'})
    //             }
    //         })
    // }
    // catch(error){
    //     console.log(error.message);
    // }

    try{
            const obj = req.body;
            let D = new Date().toISOString();
            obj["Date"] = D; 
        
            fs.readFile('logger.json', 'utf8', (err, data)=>{

                if(err){
                    return res.json({message:err.message});
                }
                
                try{
                    const filedata = JSON.parse(data);
                        filedata.push(obj);


                        fs.writeFile('logger.json', JSON.stringify(filedata, null , 2), (err)=>{
                            if(err){
                                return res.json({message:err.message});
                            }
                            else{
                                return res.json({message:'File is Updated'});
                            }
                        })
                }
                catch(err){
                    return res.json({message:err.message});
                }
            })
    }
    catch(error){
        console.log(error.message);
    }
})

app.get('/read', (req, res)=>{

    try{
            fs.readFile('logger.json', 'utf-8', (err, data)=>{
                if(err){
                    return res.json({message:err.message})
                }
                else{
                    return res.json({data:JSON.parse(data)});
                }    

            });
    }
    catch(error){
            return res.json({message:error.message});
    }
})


app.listen(5001, ()=>{
    console.log('App is Running');
})
