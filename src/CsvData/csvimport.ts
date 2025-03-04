import fs from 'fs';
import { format } from 'date-fns';
import path from 'path';

const directoryPath = path.join(__dirname, '..', '..', 'AirIsanDownload', 'Pyton_process_PM2.5', '2025');
let fileedif = ''



export const readCsvFile = (filePath?: string, day?: any): string => {
    if (!fs.existsSync(directoryPath)) {
        console.error(`❌ Directory not found: ${directoryPath}`);
    } else {
        console.log(`📂 Watching directory: ${directoryPath}`);
    
        fs.watch(directoryPath, (eventType, filename) => {
            if (eventType === 'rename' && filename) { 
                console.log(`📌 File changed: ${filename}`);
                if (filename.endsWith('.csv')) { 
                    console.log("🟢 New CSV file detected, reading...");
                    const today = new Date();
                    const csvData = readCsvFile(undefined, today);
    
                    fileedif = csvData
                    // console.log(csvData)
                }
            }
        });
    }
    try {
        const dateOnly = format(day, 'yyyy-MM-dd');
        const datechek = dateOnly.replace(/-/g, ''); 

        if (!fs.existsSync(directoryPath)) {
            throw new Error(`❌ Directory not found: ${directoryPath}`);
        }

        const files = fs.readdirSync(directoryPath);
        let targetFile = '';
        for (const file of files) {
            if (file === `PM18District${datechek}.csv`) {
                targetFile = path.join(directoryPath, file); 
                break;
            }
        }

        if (!targetFile) {
            throw new Error( `PM18District${datechek}.csv not found in ${directoryPath}`);
        }

        return targetFile
    } catch (error) {
        console.error("🚨 Error reading CSV file:", error);
        return '';
    }
};


export const updatefile = (file?: any): any => {
    if (!fs.existsSync(file)) {
        console.error('Source file not found:', file);
        return;
    }
    const fileName = path.basename(file);

    const destinationFolder = path.join(__dirname, '..', '..', 'AirIsanDownload', 'Pyton_process_PM2.5', 'UpdateFile');
    const destinationPath = path.join(destinationFolder, fileName);

    console.log('Destination path:', destinationPath);

    if (!fs.existsSync(destinationFolder)) {
        fs.mkdirSync(destinationFolder, { recursive: true });
    }
    try {
        fs.renameSync(file, destinationPath);
        console.log('File renamed/moved successfully:', destinationPath);
    } catch (error) {
        console.error('Error moving file:', error    );
    }
};