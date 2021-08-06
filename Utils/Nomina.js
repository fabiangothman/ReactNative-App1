//Config
import { legalConfig } from '../configGeneral';

export const getSubsidioTransporte = (salario) => {
    return (salario < legalConfig.minSalary_value*2) ? Math.round(legalConfig.auxTransp_value): 0;
}

export const getFondoSolidaridad = (salario) => {
    let resul = 0;
    if(salario >= legalConfig.minSalary_value*4 && salario < legalConfig.minSalary_value*16){
        resul = salario*0.01;

    }else if(salario >= legalConfig.minSalary_value*16 && salario < legalConfig.minSalary_value*17){
        resul = salario*0.012;

    }else if(salario >= legalConfig.minSalary_value*17 && salario < legalConfig.minSalary_value*18){
        resul = salario*0.014;

    }else if(salario >= legalConfig.minSalary_value*18 && salario < legalConfig.minSalary_value*19){
        resul = salario*0.016;

    }else if(salario >= legalConfig.minSalary_value*19 && salario <= legalConfig.minSalary_value*20){
        resul = salario*0.018;

    }else if(salario > legalConfig.minSalary_value*20){
        resul = salario*0.02;

    }
    return Math.round(resul);
}

//Deprecated: hacen falta alguno calculos
export const getRetefuente = (salario) => {
    const salarioEnUVT = salario/legalConfig.uvt;
    let resul = 0;

    if(salarioEnUVT > 95 && salarioEnUVT <= 150){
        resul = ((salarioEnUVT-95)*0.19);

    }else if(salarioEnUVT > 150 && salarioEnUVT <= 360){
        resul = ((salarioEnUVT-150)*0.28 + 10);

    }else if(salarioEnUVT > 360 && salarioEnUVT <= 640){
        resul = ((salarioEnUVT-360)*0.33 + 69);

    }else if(salarioEnUVT > 640 && salarioEnUVT <= 945){
        resul = ((salarioEnUVT-640)*0.35 + 162);

    }else if(salarioEnUVT > 945 && salarioEnUVT <= 2300){
        resul = ((salarioEnUVT-945)*0.37 + 268);

    }else if(salarioEnUVT > 2300){
        resul = ((salarioEnUVT-2300)*0.39 + 770);

    }
    return Math.round(resul*legalConfig.uvt);
}

export const calculateDaysWorked = (objEndDate, objStartDate) => {
    objEndDate = new Date(objEndDate.year, objEndDate.month, objEndDate.day);
    objStartDate = new Date(objStartDate.year, objStartDate.month, objStartDate.day);
    const diffTime = objEndDate.getTime() - objStartDate.getTime();
    return Math.round(diffTime/(1000 * 3600 * 24))+1;
}

export const calculateYearDaysWorked = (objEndDate, objStartDate) => {
    objEndDate = new Date(objEndDate.year, objEndDate.month, objEndDate.day);
    objStartDate = new Date(objEndDate.getFullYear(), 1, 1);
    const diffTime = objEndDate.getTime() - objStartDate.getTime();
    return Math.round(diffTime/(1000 * 3600 * 24))+1;
}

export const calculateMidYearDaysWorked = (objEndDate, objStartDate) => {
    let currDate = new Date();
    currDate = {
        day: currDate.getDate(),
        month: currDate.getMonth()+1,
        year: currDate.getFullYear(),
    };

    //Primera mitad del año
    if(objEndDate.month <= 6){
        const dateStartCalc = (objStartDate.year < currDate.year) ? new Date(currDate.year, 1, 1) : new Date(currDate.year, objStartDate.month, objStartDate.day);
        const dateEndCalc = new Date(currDate.year, objEndDate.month, objEndDate.day);
        const diffTime = dateEndCalc.getTime() - dateStartCalc.getTime();
        return Math.round(diffTime/(1000 * 3600 * 24))+1;
    }else{
        const dateStartCalc = (objStartDate.year < currDate.year || objStartDate.month < 7) ? new Date(currDate.year, 7, 1) : new Date(currDate.year, objEndDate.month, objEndDate.day);
        const dateEndCalc = new Date(currDate.year, objEndDate.month, objEndDate.day);
        const diffTime = dateEndCalc.getTime() - dateStartCalc.getTime();
        return Math.round(diffTime/(1000 * 3600 * 24))+1;
    }
}

export const calculateMonthDaysWorked = (objEndDate, objStartDate) => {
    if(objStartDate.year == objEndDate.year && objStartDate.month <= objEndDate.month){
        const dateStartCalc = new Date(objEndDate.year, objEndDate.month, 1);
        const dateEndCalc = new Date(objEndDate.year, objEndDate.month, objEndDate.day);
        const diffTime = dateEndCalc.getTime() - dateStartCalc.getTime();
        return Math.round(diffTime/(1000 * 3600 * 24))+1;
    }else{
        let dateStartCalc = 0;
        if(objStartDate.year == objEndDate.year){
            dateStartCalc = new Date(objEndDate.year, objEndDate.month, objStartDate.day);
        }else{
            dateStartCalc = new Date(objEndDate.year, objEndDate.month, 1);
        }
        const dateEndCalc = new Date(objEndDate.year, objEndDate.month, objEndDate.day);
        const diffTime = dateEndCalc.getTime() - dateStartCalc.getTime();
        return Math.round(diffTime/(1000 * 3600 * 24))+1;
    }
}
