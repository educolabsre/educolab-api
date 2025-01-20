const Forum = require("../models/Forum");
const Student = require("../models/Student");
const axios = require("axios");

exports.getConfirmed = (req, res) => {
  const id = req.params.id;

  Forum.findOne({ id })
    .then((result) => {
      if (!result?.isConfirmed) {
        return res.json({ isConfirmed: false });
      }

      return res.json({ isConfirmed: true });
    })
    .catch((err) => {
      res.status(500).send(`Ocorreu um erro ao consultar o fórum.`);
      console.log(err);
    });
};

exports.getParticipationConfirmed = (req, res) => {
  const id = req.params.id;

  Student.findOne({ id })
    .then((result) => {
      if (!result?.hasConfirmed) {
        return res.json({ hasConfirmed: false });
      }

      return res.json({ hasConfirmed: true });
    })
    .catch((err) => {
      res.status(500).send(`Ocorreu um erro ao consultar a participação do estudante.`);
      console.log(err);
    });
};

exports.getConfirmRegistration = (req, res) => {
  const id = req.params.id;

  Forum.findOne({ id }).then((result) => {
    if (!result) {
      return res.status(404);
    }

    if (result.isConfirmed) {
      return res.send(`O cadastro do fórum já foi confirmado.`);
    }

    axios
      .post("https://educolab-api-hlvv.onrender.com/confirm-registration", {
        id: id,
      })
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => console.log(err));
  });
};

exports.getConfirmParticipation = (req, res) => {
  const id = req.params.id;

  Student.findOne({ id }).then((result) => {
    if (!result) {
      return res.status(404);
    }

    if (result.hasConfirmed) {
      return res.send(`Sua participação já foi confirmada.`);
    }

    axios
      .post("https://educolab-api-hlvv.onrender.com/confirm-participation", {
        id: id,
      })
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => console.log(err));
  });
};

exports.postConfirmRegistration = (req, res) => {
  const id = req.body.id;

  const message = `
    <div style="padding:1.5rem 1.5rem;border:3px solid #e8e8e8;border-radius:7px;font-family: Georgia, serif;width:75%;margin:1.5rem auto auto auto">
      <p style="margin-top:0">Prezado(a) professor(a),<br /><br />Obrigado por confirmar o monitoramento desse fórum de discussão. A partir de agora, cada vez que fornecer o arquivo exportado na opção “Analisar Fórum” você e os estudantes receberão e-mails com as recomendações.</p>
      <p>Atenciosamente,</p>
      <p>---</p>
      <p><a href="https://drive.google.com/file/d/1lDDJDDrh2yinrDVg9dUE-ECqGkBuoKjD/view">EduColab - Sistema de Recomendação Educacional para Diagnosticar e Promover a Colaboração em AVAs</a> (<b>EduColab</b>)</p>
      <p>Pesquisador: Antônio J. Moraes Neto (IFB, SEDF)</p>
      <p>Orientadora: Prof.ª Dr.ª Márcia A. Fernandes (UFU/FACOM/PPGCO)</p>
      <p>Coorientador: Prof. Dr. Tel Amiel (UnB/FE/PPGE)</p>
      <p style="margin-bottom:0">Colaboradores: Gabriel J. C. Lima; Prof. Dr. Raimundo C. S. Vasconcelos (IFB); Prof. Dr. Newarney T. Costa (IF Goiano)</p>
    </div>
  `;

  Forum.updateOne({ id }, { $set: { isConfirmed: true } })
    .then(() => {
      res.send(message);
    })
    .catch((err) => {
      res
        .status(500)
        .send(`Ocorreu um erro ao confirmar o cadastro do fórum.`);
      console.log(err);
    });
};

exports.postConfirmParticipation = (req, res) => {
  const id = req.body.id;

  const message = `
    <div style="padding:1.5rem 1.5rem;border:3px solid #e8e8e8;border-radius:7px;font-family: Georgia, serif;width:75%;margin:2rem auto auto auto">
      <p style="margin-top:0">Prezado(a) estudante(a),<br /><br />Você confirmou o recebimento de recomendações para colaborar nesse fórum de discussão. Em breve você receberá e-mails com essas recomendações.</p>
      <p>Atenciosamente,</p>
      <p>---</p>
      <p><a href="https://drive.google.com/file/d/1lDDJDDrh2yinrDVg9dUE-ECqGkBuoKjD/view">EduColab - Sistema de Recomendação Educacional para Diagnosticar e Promover a Colaboração em AVAs</a> (<b>EduColab</b>)</p>
      <p>Pesquisador: Antônio J. Moraes Neto (IFB, SEDF)</p>
      <p>Orientadora: Prof.ª Dr.ª Márcia A. Fernandes (UFU/FACOM/PPGCO)</p>
      <p>Coorientador: Prof. Dr. Tel Amiel (UnB/FE/PPGE)</p>
      <p style="margin-bottom:0">Colaboradores: Gabriel J. C. Lima; Prof. Dr. Raimundo C. S. Vasconcelos (IFB); Prof. Dr. Newarney T. Costa (IF Goiano)</p>
    </div>
  `;

  Student.updateOne({ id: id }, { $set: { hasConfirmed: true } })
    .then((result) => {
      res.send(message);
    })
    .catch((err) => {
      res
        .status(500)
        .send(`Ocorreu um erro ao confirmar a participação no fórum.`);
      console.log(err);
    });
};

exports.postUnsubscribe = (req, res) => {
  const id = req.body.id;

  const message = `
    <div style="padding:1.5rem 1.5rem;border:3px solid #e8e8e8;border-radius:7px;font-family: Georgia, serif;width:75%;margin:2rem auto auto auto">
      <p style="margin-top:0">Prezado(a) estudante(a),<br /><br />Inscricão removida com sucesso. A partir de agora, você não receberá mais recomendações relacionadas a esse fórum.</p>
      <p>Atenciosamente,</p>
      <p>---</p>
      <p><a href="https://drive.google.com/file/d/1lDDJDDrh2yinrDVg9dUE-ECqGkBuoKjD/view">EduColab - Sistema de Recomendação Educacional para Diagnosticar e Promover a Colaboração em AVAs</a> (<b>EduColab</b>)</p>
      <p>Pesquisador: Antônio J. Moraes Neto (IFB, SEDF)</p>
      <p>Orientadora: Prof.ª Dr.ª Márcia A. Fernandes (UFU/FACOM/PPGCO)</p>
      <p>Coorientador: Prof. Dr. Tel Amiel (UnB/FE/PPGE)</p>
      <p style="margin-bottom:0">Colaboradores: Gabriel J. C. Lima; Prof. Dr. Raimundo C. S. Vasconcelos (IFB); Prof. Dr. Newarney T. Costa (IF Goiano)</p>
    </div>
  `;

  Student.updateOne({ id: id }, { $set: { hasConfirmed: false } })
    .then((result) => {
      res.send(message);
    })
    .catch((err) => {
      res
        .status(500)
        .send(`Ocorreu um erro ao desinscrever a participação no fórum.`);
      console.log(err);
    });
};