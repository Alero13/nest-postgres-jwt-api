console.log(process.env.JWT_SECRET);

export const jwtConstants = {
    //secret: "No utilizar esta palabra en produccion"
    secret: process.env.JWT_SECRET,
}