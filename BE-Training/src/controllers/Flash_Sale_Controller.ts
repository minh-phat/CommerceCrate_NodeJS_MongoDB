import schedule from 'node-schedule'
import moment from 'moment-timezone'
import { ObjectId } from 'mongodb';
import { Request, Response } from "express";
import { IFlashSale } from '@/types/Flash_Sale_Interface';
import FlashSaleModel from '@/models/Flash_Sale_Schema'
//Handle API
export function AddFlashSale (req: Request, res: Response){
    const {start_time, end_time} = req.body

    const newflashSale = new FlashSaleModel({
        start_time: start_time,
        end_time: end_time,
        status: 'Active'
    })

    newflashSale.save().then(flashSale => {
        res.status(200).json({message: 'Add flash sale successful', data: flashSale})
        RunFlashSale(flashSale.start_time)
    }).catch(error => {
        res.status(400).json({error: error.message, errorFilePath: __filename})
    })
}
export async function ViewAllFlashSale (req: Request, res: Response){
    await FlashSaleModel.find()
    .then(flashSale => {
        res.status(200).json({message: 'view all flash sale successful', data: flashSale})
        return {success: true , data: flashSale}
    })
    .catch(error => {
        res.status(400).json({error: error.message, errorFilePath: __filename})
        return {success: false, error: error.message}
    })

}

//Handle Logic
export async function CloseFlashSale (FlashSaleObjectId: ObjectId){
    await FlashSaleModel.findByIdAndUpdate({ _id: FlashSaleObjectId },
        { $set: 
            {   
                status: "Closed",
            }
        }
    )
    .then(updatedFlashSale => {
        if (updatedFlashSale) {
            // res.status(200).json({message: "Flash sale closed"});
        } else {
            // res.status(400).json({message: "Flash sale not found"});
        }
    })
    .catch(error => {
        // res.status(400).json({error: error, errorFilePath: currentFile});
    });

}
export async function ViewAllFlashSaleLogic(): Promise<{ success: boolean; data?: any; error?: any }> {
    try {
        const flashSales = await FlashSaleModel.find();
        return { success: true, data: flashSales };
    } catch (errors) {
        console.error('Error viewing all flash sales:', errors);
        return { success: false, error: errors };
    }
}

export async function ViewAllActiveFlashSaleLogic(): Promise<{ success: boolean; data?: any; error?: any }> {
    var query = { static: "Active" };
    try {
        const flashSales = await FlashSaleModel.find(query);
        return { success: true, data: flashSales };
    } catch (errors) {
        console.error('Error viewing all flash sales:', errors);
        return { success: false, error: errors };
    }
}
// export async function ViewAllFlashSaleLogic(): Promise<{ success: boolean; data?: any; error?: string }> {
//     await FlashSaleModel.find()
//     .then(flashSale => {     
//         console.log('view all flash sale successful', flashSale)  
//         return {success: true , data: flashSale}
//     })
//     .catch(error => {      
//         return {success: false, error: error.message}
//     })

// }

export function RunFlashSale(dateTime: Date) { 
    const targetTime = moment.tz(dateTime, 'Asia/Ho_Chi_Minh');

    // Chuyển đổi thời gian đích sang UTC
    const targetTimeUtc = targetTime.clone().tz('UTC');
    
    // Lấy các thông tin về giờ, phút và giây
    const hour = targetTimeUtc.hour();
    const minute = targetTimeUtc.minute();
    const second = targetTimeUtc.second();
    
    // Tạo một lịch trình với node-schedule
    const job = schedule.scheduleJob({hour, minute, second, tz: 'UTC'}, function(){
      console.log('Chạy hàm vào 3:00 PM giờ Việt Nam');
      // Gọi hàm của bạn ở đây
    });
    
    // In ra thời gian lập lịch (để kiểm tra)
    console.log('Đã lập lịch chạy hàm vào:', targetTime.format(), 'giờ Việt Nam');
}

export async function RunAllFlashSale() { 
    const result = await ViewAllActiveFlashSaleLogic();
    if (result.success) {
        const FlashSaleData = result.data
        // const startTimes = FlashSaleData.map(item => item.start_time);
    
        const data: IFlashSale[] = result.data
        data.forEach(item => RunFlashSale(item.start_time));
       console.log("data ",FlashSaleData);
    } else {
        console.log(result.error);
    }
}
