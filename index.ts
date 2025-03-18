import Express,{Request, Response, NextFunction} from "express";
import cors from 'cors'
import { AppDataSource } from "./src/app-data-source/app-data-source";
import { readCsvFile, updatefile } from "./src/CsvData/csvimport";
import fs, { copyFileSync } from 'fs'
import { AirIsan_district } from "./src/Colam/AirIsan_district";
import { AirIsan } from "./src/Colam/user.entity";
// import { Network } from "inspector/promises";
import rou from "./src/apirou/router";
import { format } from 'date-fns';
import { AirIsan_Image_ } from "./src/Colam/ima_Airlsan_other";

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

        console.log(csvData)
       const users = await AppDataSource.getRepository(AirIsan_district)
       const airsan_images_ = await AppDataSource.getRepository(AirIsan_Image_)
       const airsan_imgges_find = await airsan_images_.find({ where: { airisan_number: 1}})
       
       if(csvData){
        let savedRecords = []
        for(let i=3; i <= 5  ; i++){
            // const data = lines[i].split(',')
            console.log(lines.length)
            for (let k=0; k <= lines.length; k++){
                    const data = lines[k].split(',')
                    // console.log((<String> bb[1]).toUpperCase() + '23')
                    // console.log(data)
                    let newData: any = {
                        year: data[0].trim(),
                        month: data[1].trim(),
                        day: data[2].trim(),
                        Hour: data[3].trim(),
                        province: data[4].trim(),
                        district: data[5].trim().replace(/\s+/g, '_'),
                        ododp: parseFloat(data[6].trim()),
                        vegetation: parseFloat(data[7]),
                        layer_heigh: parseFloat(data[8].trim()),
                        temperature: parseFloat(data[9].trim()),
                        relative_hamidity: parseFloat(data[10].trim()),
                        wind_speed: parseFloat(data[11].trim()),
                        PM25: parseFloat(data[12].trim()),
                        dust_height: parseFloat(data[13].trim()),
                        airisan_imgae: 0
                        }

                        const matchedImage = airsan_imgges_find.find((air) => newData.district === air.name_airisan_en);
                        if (matchedImage) {
                            newData.airisan_imgae = matchedImage.id; 
                        }
                    
                    console.log(newData)
                    const cre = users.create(newData)
                    console.log(newData)
                    const save = await users.save(cre)
                    savedRecords.push(save)       
            }
        }
        // updatefile(csvData)
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


index.get("/airisan_province/:province", async (req: Request, res: Response) => {
    try{
        const airisans = await AppDataSource.getRepository(AirIsan)
        const airisan_districts = await AppDataSource.getRepository(AirIsan_district)
        const hours = date.getUTCHours();
        const check_airisans_province = await airisans.findOne({ where: { province: String(req.params.province), Hour: String(hours)}})
        const check_airisansdistricts_province = await airisan_districts.findOne({ where: {district: String(req.params.province), Hour: String(hours)}})
        const dateOnly = format(date, 'yyyy-MM-dd'); 
        console.log(req.params.province)
        const chek_year: string = 
        (check_airisans_province?.year || check_airisansdistricts_province?.year) + '-'+ 
        (check_airisans_province?.month || check_airisansdistricts_province?.month) + '-' +
        (check_airisans_province?.day || check_airisansdistricts_province?.day);
        const bb_ = new Date(chek_year)
        const date_year = format(bb_, 'yyyy-MM-dd');
        if(check_airisans_province){
            if(dateOnly === date_year ){
                if(Number(check_airisans_province.Hour) === hours){
                    res.json({DATA: "data pm ", check_airisans_province})
                }else{
                    const check_airisans_province_now_ = await airisans.findOne({where: {province: String(check_airisans_province.province)}})
                    res.json({ DATA: "Now data pm", check_airisans_province_now_})
                }
            }else{
                const check_airisans_province_now_ = await airisans.findOne({where: {province: String(check_airisans_province.province)}})
                res.json({ DATA: "Now data pm", check_airisans_province_now_})
            }
        }else if(check_airisansdistricts_province){
            console.log(dateOnly,date_year)
            console.log(check_airisansdistricts_province.Hour, hours, 222)
            if(dateOnly === date_year ){
                if(Number(check_airisansdistricts_province.Hour) === hours){
                    console.log(check_airisansdistricts_province.Hour, hours, 111)
                    res.json({DATA: "data pm ", check_airisansdistricts_province})
                }else{
                    console.log("dafa")
                    const check_airisans_province_now_ = await airisans.findOne({where: {province: String(check_airisansdistricts_province.district)}})
                    res.json({ DATA: "Now data pm", check_airisans_province_now_})
                }
            }else{
                const check_airisans_province_now_ = await airisans.findOne({where: {district: String(check_airisansdistricts_province.district)}})
                console.log(check_airisans_province_now_)
                res.json({ DATA: "Now data pm", check_airisans_province_now_})
            }
        }else{
            res.status(401).json({ Error: "ข้อมุลจังงหวัดหรืออำเภอไม่ถูกต้อง"})
        }
        
    }catch(err){
        console.log(err)
    }
})

const airisan_find_fn = async (
    airisan_districts: any,
    days: string,
    months: string,
    years: number,
    hours: number
  ) => {
    const a = await airisan_districts.find({
        where: { 
            day: days, 
            month: months, 
            year: String(years), 
            Hour: String(hours) 
        },
        relations: ['airisan_imgae'] 
    });
  
    const check_airisans_now = await airisan_districts.find({
      order: { createdAt: "DESC" },
      take: 18,
      where: { Hour: '23'},
      relations: ['airisan_imgae'] 
    });
  
    return a || check_airisans_now;
  };
  
  index.get("/airisan_", async (req: Request, res: Response) => {
    try {
      const airisans = AppDataSource.getRepository(AirIsan);
      const airisan_districts = AppDataSource.getRepository(AirIsan_district);
      
      const date = new Date();
      const hours = date.getUTCHours();
      const years = date.getFullYear();
      const months = format(date, "MM");
      const days = format(date, "dd");
  
      const check_airisans_ = await airisan_find_fn(
        airisan_districts,
        days,
        months,
        years,
        hours
      );
      res.json({ DATA: "data true good", check_airisans_ });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

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