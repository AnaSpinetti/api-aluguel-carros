import fs from "fs";

export const deleteFile = async(filename:string) => {
    try {
        //Verificando se o arquivo existe
        await fs.promises.stat(filename);
    } catch (error) {
        return;
    }
    // Removendo o arquivo caso exista
    await fs.promises.unlink(filename);
}