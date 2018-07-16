const Joi = require('joi');
const express = require('express');
const app = express();
const endpoint = 'https://localhost/api/course1';
const asyncMiddleware = async (req,res,next) => {
  const data = await PromiseBasedDataRequest(endpoint);
  req.data = data.json()
  next()
}


//adding a peace of middleware
app.use(express.json());
require('express-async-await')(app);


const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'},


]
// app.get('/',asyncMiddleware, (req, res) =>{
//   const {title, body} = req.data;
//   res.render('api', {title, body});
// });


app.get('/api/courses',async function(req, res, next)=>{
    res.json(await courses);
});

app.post('/api/courses', async function(req, res, next)=>{

  const {error} = validateCourse(req.body);

  if (error)
  {res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  //res.send(course);
  res.json(course);
});

app.put('/api/courses/:id',await function (req, res, next) => {
  //look up the course
  //if not existinng, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('the course with the given id was not found');

  const { error } = validateCourse(req.body);//result.error
  if (error){
    res.status(400).send(result.error.details[0].message);
    return;
  }

  //update course1
  course.name = req.body.name;
  //res.send(course);
  res.json(course);
  //return the updated courses
});
                        //object
function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);

}




app.delete('/api/courses/:id',await function(req, res,next) =>{
  //look up the course1
  //Not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('the course with the given id was not found');

  //delete
   const index = courses.indexOf(course);
   courses.splice(index, 1); //remove the object from course

  //Return the same course
  res.json(await course);
  //res.send(course);
});




//api/courses/1
app.get('/api/courses/:id', async function(req, res, next) => {
const course = courses.find(c => c.id === parseInt(req.params.id));
if (!course) res.status(404).send('the course with the given id was not found'); //404
res.json(await course(req.params.id));
// +res.send(course);

});

//years/month
// app.get('/api/posts/:year/:month', (req, res) => {
//   res.send(req.query);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening the port ${port}.....`));
