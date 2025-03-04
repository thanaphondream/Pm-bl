import Express,{Request, Response, NextFunction} from "express";
import cors from 'cors'
import { AppDataSource } from "./src/app-data-source/app-data-source";
import { readCsvFile, updatefile } from "./src/CsvData/csvimport";
import fs from 'fs'
import { AirIsan_district } from "./src/Colam/AirIsan_district";
import { AirIsan } from "./src/Colam/user.entity";
// import { Network } from "inspector/promises";
import rou from "./src/apirou/router";

const date = new Date()
const filePath: string = ''
const csvData = readCsvFile(filePath, date)
const x = fs.readFileSync(csvData, 'utf-8');
const lines = x.split('\n')
console.log(lines[1])

const index = Express()

index.use(Express.json())
index.use(cors())


index.post('/ff',async(req: Request, res: Response, next: NextFunction) => {
    try{
       const users = await AppDataSource.getRepository(AirIsan_district)
       
       if(csvData){
        let savedRecords = []
        for(let i=3; i <= 5  ; i++){
            // const data = lines[i].split(',')
            for (let k=414; k <= 415; k++){
                    const data = lines[k].split(',')
                    // console.log((<String> bb[1]).toUpperCase() + '23')
                    const newData = {
                        year: data[0].trim(),
                        month: data[1].trim(),
                        day: data[2].trim(),
                        Hour: data[3].trim(),
                        province: data[4].trim(),
                        district: data[5].trim(),
                        ododp: parseFloat(data[6].trim()),
                        vegetation: parseFloat(data[7]),
                        layer_heigh: parseFloat(data[8].trim()),
                        temperature: parseFloat(data[9].trim()),
                        relative_hamidity: parseFloat(data[10].trim()),
                        wind_speed: parseFloat(data[11].trim()),
                        PM25: parseFloat(data[12].trim()),
                        dust_height: parseFloat(data[13].trim()),
                        };
                    
                        console.log(newData)
                        const cre = users.create(newData)
                        console.log(newData)
                        const save = await users.save(cre)
                        savedRecords.push(save)
            }
        }
        updatefile(csvData)
        res.json({ savedRecords })
       }else{
        console.log('ไม่มีข้อมูลไฟล์ในวันนี้')
        next('ไม่มีข้อมูลไฟล์ในวันนี้')
        res.status(401).json({Message: "'ไม่มีข้อมูลไฟล์ในวันนี้'"})
       }
    }catch(err){
        console.log(err)
    }
})

index.post("/airisan", async (req: Request, res: Response) => {
    try{
        const airisanRepository = AppDataSource.getRepository(AirIsan)

        console.log(req.body)
        const airisanData = airisanRepository.create(req.body);
        const savedAirisan = await airisanRepository.save(airisanData);
        res.status(201).json(savedAirisan);
    }catch(err){
        console.log(err)
    }
})

index.get("/airisan", async (req: Request, res: Response) => {
    try{
        const airisans = await AppDataSource.getRepository(AirIsan)
        const airisan_showdata = await airisans.find({ relations: ["airisan_district_id"]})
        res.json(airisan_showdata)
    }catch(err){
        console.log(err)
    }
})

index.get("/airisan/:id", async (req: Request, res: Response) => {
    try{
        const airisans = await AppDataSource.getRepository(AirIsan)
        const airisan_showdata = await airisans.findOne({ relations: ["airisan_district_id"], where: {id: Number(req.params.id)}})
        res.json(airisan_showdata)
    }catch(err){
        console.log(err)
    }
})

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


index.get("/bb", () => {
    console.log("Hello world")
})


index.use('/api', rou)

index.listen(4002, () => { console.log("Hello Server: 4002")})