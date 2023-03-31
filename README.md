Вы спросите, что это за фигня? Так вот это информационная система для приемных компаний базирующаяся на конкурсной основе. Вбиваются данные абитуриентов, после чего автоматически формируются excel списки на основе рейтингов поступающих, также можно сгенерировать заявление на поступление после заведения карточки студента. 

First, run the development server:

```bash
git clone https://github.com/ckieverentineas/admission-committee-main.git
cd admission-committee-main
npm i
npx prisma migrate dev --name init
npx prisma generate
npm run dev
# or
yarn dev
```
