module.exports = class Human
{
    // construcor (id,first_name,last_name,email,
    //     gender,company,country,height,weight) {
        constructor(id, first_name,last_name,email,gender,company,country,height,weight) {
            // console.log(id);
            // console.log(first_name);
        this.id         = id;
        this.first_name = first_name;
        this.last_name  = last_name;
        this.email      = email;
        this.gender     = gender;
        this.company    = company;
        this.country    = country;
        this.height     = height;
        this.weight     = weight;
    }

}