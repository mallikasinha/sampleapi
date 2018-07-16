const Joi = require('joi');
const express = require('express');
const app = express();


//adding a peace of middleware
app.use(express.json());

const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'},
  


]
app.get('/',(req, res) =>{
  res.send('hello world');
});
app.get('/api/courses',(req, res)=>{
    res.send(courses);
});

app.post('/api/courses', (req, res)=>{

  const {error} = validateCourse(req.body);

  if (error) {res.status(400).send(result.error.details[0].message);
    return;
}


  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
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
  res.send(course);
  //return the updated courses
});
                        //object
function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);

}



app.delete('/api/courses/:id', (req, res) =>{
  //look up the course1
  //Not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('the course with the given id was not found');

  //delete
   const index = courses.indexOf(course);
   courses.splice(index, 1); //remove the object from course

  //Return the same course
  res.send(course);
})
















//api/courses/1
app.get('/api/courses/:id', (req, res) => {
const course = courses.find(c => c.id === parseInt(req.params.id));
if (!course) res.status(404).send('the course with the given id was not found'); //404
res.send(course);

});

//years/month
// app.get('/api/posts/:year/:month', (req, res) => {
//   res.send(req.query);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening the port ${port}.....`));
