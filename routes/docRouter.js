const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/doc/:room', (req, res)=>{
/*
  // FS example storing users: userService.insertUserDb(newUser);
  dont forget to include document contents here, fetch em from firebase
*/
  const prep = req.params.room;
  console.log(prep);
  return res.render('docViewer', {data: 'templateText', room: prep});
});

router.post('/doc/handleDoc', (req, res) => {
  const room = req.body.docName;
  // console.log(room);
  res.redirect('/doc/' + room);
});

module.exports = router;
