try {
    
    


  emailSubmit = async () => {
    const config = {
        host : 'smtp.gmail.com',
        port : 587,
        auth : {
            user : process.env.USER,
  
            pass : process.env.PASS
        }
    }
const mensaje = {
  from : process.env.USER,
  to : process.env.TO,
  subject : 'formulario programacion2',
  text : ' nombre: ' + name + ' comentario: ' + comment + ' email: ' + email + ' fecha: ' + date + ' la ip: ' + myIP + ' el pais es: ' + country
}
const transport = nodemailer.createTransport(config);
const info = await transport.sendMail(mensaje);

console.log(info);
} 

emailSubmit();

db.insert(name, email, comment, date, myIP, country);
res.redirect('/');
} catch (error) {
console.error(error);
}



















