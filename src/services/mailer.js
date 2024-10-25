import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'lcoronadoj@miumg.edu.gt',
      pass: 'giai kgcd ptzh kweh',
    },
  });

  transporter.verify().then(() => {
    console.log("Listo para enviar correos");
  }
    ).catch((error) => {
        console.error("Error al verificar el transportador", error);
    });