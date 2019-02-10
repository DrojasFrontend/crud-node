const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
	//res.send('Home');
	const tasks = await Task.find();
	res.render('index', {
		tasks
	});
	console.log(tasks);
});

router.post('/add', async (req, res) => {
	//console.log(new Task(req.body));
	//console.log(req.body);
	const task = new Task(req.body);
	await task.save();
	//res.send('Recived');
	res.redirect('/');
	
});

router.get('/done/:id',  async (req, res) => {
	const { id } = req.params;
	const task = await Task.findById(id);
	//console.log(task);
	task.status = !task.status;
	await task.save();
	//res.send('Status');
	//console.log(task);
	res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
	const { id } = req.params;
	await Task.remove({ _id: id });
	res.redirect('/');
});

// ##########################################
router.get('/edit/:id', async (req, res) => {
	const { id } = req.params;
	const task = await Task.findById(id);
	res.render('edit', {
		task
	});
});

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  await Task.update({ _id: id }, req.body);
  res.redirect('/')
});
// ##########################################

module.exports = router;