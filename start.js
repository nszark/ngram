const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://nszark:UxMLOJN2JmfDNzqL@cluster0.mtrfwr5.mongodb.net/ngram');
  
  const ngramUserSchema = new mongoose.Schema({
    handle: String,
    password: String,
    description: String,
    followers: Array,
    following: Array
  });

  ngramUserSchema.methods.speak = function speak() {
    const greeting = this.handle
      ? "My handle is " + this.handle
      : "I am non-existent";
    const greetingPart2 = this.description
      ? "My vibe is " + this.description
      : "I am loh";
    console.log(greeting + " " + greetingPart2);
  };

  const ngramUser = mongoose.model('User', ngramUserSchema);

  const Andronik = new ngramUser({ handle: 'and_yakym', password: 'sexmachine666', description: 'i like pivo and women' });
  Andronik.speak(); 
  await Andronik.save();

  const Nazar = new ngramUser({ handle: 'ns_zark', password: 'taylorswift420'});
  Nazar.speak(); 
  await Nazar.save();
}