import { useEffect, useState } from 'react'
import styles from '/styles/Home.module.css'
import { Specialization } from '@prisma/client'
export default function Registrator() {
    function handleSubmit(e: any) {
        e.preventDefault()
        const {
            citizenship, passport, passport_seria,
            passport_number, passport_place, passport_date,
            firstname, name, lastname,
            birthday, birthday_place, phone,
            gender, svo, adress_register, adress_fact,
            email, language, specialization_first,
            specialization_second, form_education, form_education_pay,
            education_complete_name, education_complete_year, education_complete_category,
            education_complete_document, education_complete_seria, education_complete_number,
            education_complete_date, education_complete_type, medal,
            olympiad, work_stage_year, work_stage_month,
            work_place_post, house, snils,
            inn, education_spo, parent_mother_initial,
            parent_mother_work, parent_mother_work_post, parent_mother_phone,
            parent_father_initial, parent_father_work, parent_father_work_post,
            parent_father_phone, hobby, army,
            sport, sport_level, success, tree, four, five
            
        } = e.target.elements
        const data = {
            citizenship: citizenship.value, 
            passport: passport.value,
            passport_seria: passport_seria.value,
            passport_number: passport_number.value,
            passport_place: passport_place.value,
            passport_date: passport_date.value,
            firstname: firstname.value,
            name: name.value,
            lastname: lastname.value,
            birthday: birthday.value,
            birthday_place: birthday_place.value,
            phone: phone.value,
            gender: gender.value,
			svo: svo.value,
            adress_register: adress_register.value,
            adress_fact: adress_fact.value,
            email: email.value,
            language: language.value,
            specialization_first: specialization_first.value,
            specialization_second: specialization_second.value,
            form_education: form_education.value,
            form_education_pay: form_education_pay.value,
            education_complete_name: education_complete_name.value,
            education_complete_year: education_complete_year.value,
            education_complete_category: education_complete_category.value,
            education_complete_document: education_complete_document.value,
            education_complete_seria: education_complete_seria.value,
            education_complete_number: education_complete_number.value,
            education_complete_date: education_complete_date.value,
            education_complete_type: education_complete_type.value,
            medal: medal.value,
            olympiad: olympiad.value,
            work_stage_year: work_stage_year.value,
            work_stage_month: work_stage_month.value,
            work_place_post: work_place_post.value,
            house: house.value,
            snils: snils.value,
            inn: inn.value,
            education_spo: education_spo.value,
            parent_mother_initial: parent_mother_initial.value,
            parent_mother_work: parent_mother_work.value,
            parent_mother_work_post: parent_mother_work_post.value,
            parent_mother_phone: parent_mother_phone.value,
            parent_father_initial: parent_father_initial.value,
            parent_father_work: parent_father_work.value,
            parent_father_work_post: parent_father_work_post.value,
            parent_father_phone: parent_father_phone.value,
            hobby: hobby.value,
            army: army.value,
            sport: sport.value,
            sport_level: sport_level.value,
            success: success.value,
            tree: tree.value,
            four: four.value,
            five: five.value
        }
        //console.log(data)
        Register_User(data);
    }
    async function Register_User(data: any) {
        for (const i in specializationsList) {
            const cur = specializationsList[i];
            if (cur.name == data.specialization_first) {
                if (!cur.form_education.split(',').includes(data.form_education) && !cur.form_education_pay.split(',').includes(data.form_education_pay) && !cur.education_complete_category.split(',').includes(data.education_complete_category) ) {
                    const check = window.confirm(`Форма обучения ${data.form_education} --> ${cur.form_education.split(',').includes(data.form_education)}\nМесто ${data.form_education_pay} --> ${cur.form_education_pay.split(',').includes(data.form_education_pay)}\nНа базе ${data.education_complete_category} --> ${cur.education_complete_category.split(',').includes(data.education_complete_category)}\nВы уверены, что хотите добавить абитуриента на специальность не удовлетворяющую условиям?`)
                    if (!check) { return; }
                }
            }
        }
        const res = await fetch('/api/abbitur', {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const result = await res.json()
        console.log(result)
        if (result) {
            alert("Успешно подана заявка")
            document.location.href= await "/"
        } else {
            alert("Неуспешно" + result)
        }
    }
    const [specializationsList, setSpecializationsList] = useState<Specialization[] | null>(null);
    const hanleGetSpec = async () => {
        const res = await fetch('/api/specializations');
        const data = await res.json();
        setSpecializationsList(data)
    };
    useEffect(() => {
        hanleGetSpec()
    }, []);
    return (
        <div className={styles.card}>
            <h1 className={styles.title}>Создание заявления</h1>

            <form onSubmit={handleSubmit}>
                <ul className={styles.wrapper}>
                    <h2>Паспортные данные:</h2>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Гражданство:</label> 
                        <input type="text" name="citizenship" placeholder="РОССИЙСКАЯ ФЕДЕРАЦИЯ" autoComplete="off" required/>
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Документ, удостоверяющий личность:</label> 
                        <select name="passport">
                            <option value='ПАСПОРТ РФ'>паспорт Российской Федерации</option>
                            <option value='ЗАГРАНИЧНЫЙ ПАСПОРТ'>паспорт для граждан Российской Федерации, выежающих за пределы страны</option>
                            <option value='ИННОСТРАНЫЙ ПАСПОРТ'>паспорт иного государства</option>
                            <option value='ВОЕННЫЙ БИЛЕТ'>удостоверение личности военнослужащего</option>
                            <option value='ВРЕМЕННОЕ УДОСТОВЕРЕНИЕ'>временное удостоверение граждан Российской Федерации</option>
                            <option value='СВИДЕТЕЛЬСТВО О РОЖДЕНИИ'>свидетельство о государственной регистрации</option>
                        </select>
                    </li>
                    <hr/>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Серия:</label> 
                        <input type="text" name="passport_seria" maxLength={4} placeholder="0000" autoComplete="off" required/>
                        <label className={styles.label}>Номер:</label> 
                        <input type="text" name="passport_number" maxLength={6} placeholder="000000" autoComplete="off" required/>
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Кем выдан:</label> 
                        <input type="text" name="passport_place" placeholder="УМВД РОССИИ ПО ХАБАРОВСКОМУ КРАЮ" autoComplete="off" required/>
                        <label className={styles.label}>Дата выдачи:</label> 
                        <input type="date" name="passport_date" autoComplete="off" required/>
                    </li>
                    <hr/>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Фамилия:</label> 
                        <input type="text" name="firstname" placeholder="ИВАНОВ" autoComplete="off" required/>
                        <label className={styles.label}>Имя:</label> 
                        <input type="text" name="name" placeholder="ДМИТРИЙ" autoComplete="off" required/>
                        
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Отчество:</label> 
                        <input type="text" name="lastname" placeholder="ИВАНОВИЧ" autoComplete="off" required/>
                        <label className={styles.label}>Дата рождения:</label> 
                        <input type="date" name="birthday" autoComplete="off" required/>
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Место Рождения:</label> 
                        <input type="text" name="birthday_place" placeholder="Г. ХАБАРОВСК" autoComplete="off" required/>
                        <label className={styles.label}>Номер телефона:</label> 
                        <input type="tel" name="phone" maxLength={12} placeholder="88005557766" autoComplete="off"/>
                    </li>
                    <fieldset>
                        <legend>Выберите пол:</legend>
                        <input type="radio" name="gender" value="МУЖСКОЙ" required/>
                        <label>Мужской</label>
                        <input type="radio" name="gender" value="ЖЕНСКИЙ"/>
                        <label>Женский</label>
                    </fieldset>
					<fieldset>
                        <legend>Есть пометка СВО:</legend>
                        <input type="radio" name="svo" value="ДА" required/>
                        <label>Да</label>
                        <input type="radio" name="svo" value="НЕТ"/>
                        <label>Нет</label>
                    </fieldset>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Адрес регистрации места жительства:</label> 
                        <input type="text" name="adress_register" id="adr" placeholder="ИНДЕКС, ПОЛНЫЙ АДРЕС ПОСТОЯННОЙ РЕГИСТРАЦИИ, РАЙОН" autoComplete="off" required/>
                    </li>
<button
  onClick={() => {
    const got = document.getElementById('adr')?.value;
    console.log(got);
    const adr2 = document.getElementById('adr2');
    if (adr2) {
      adr2.value = got;
    }
  }}
>
  Нажмите, если адрес Регистрации совпадает с фактическим адресом
</button>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Фактический адрес места жительства:</label>
                        <input type="text" name="adress_fact" id="adr2" placeholder="ИНДЕКС, ПОЛНЫЙ АДРЕС МЕСТОЖИТЕЛЬСТВА, РАЙОН" autoComplete="off"/>
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>e-mail:</label> 
                        <input type="email" name="email" placeholder="MYEMAIL@MAIL.RU" autoComplete="off"/>
                        <label className={styles.label}>Изучаемый иностранный язык:</label> 
                        <select name="language">
                            <option value='АНГЛИЙСКИЙ'>АНГЛИЙСКИЙ ЯЗЫК</option>
                            <option value='НЕМЕЦКИЙ'>НЕМЕЦКИЙЯЗЫК</option>
                            <option value='ФРАНЦУЗСКИЙ'>ФРАНЦУЗСКИЙ ЯЗЫК</option>
                            <option value='КОРЕЙСКИЙ'>КОРЕЙСКИЙ ЯЗЫК</option>
                            <option value='КИТАЙСКИЙ'>КИТАЙСКИЙ ЯЗЫК</option>
                            <option value='ЯПОНСКИЙ'>ЯПОНСКИЙ ЯЗЫК</option>
                            <option value='ДРУГОЙ'>ДРУГОЙ ЯЗЫК</option>
                            <option value='НЕ ИЗУЧАЛ(А)'>НЕ ИЗУЧАЛ(А)</option>
                        </select>
                    </li>
                    <hr/>
                    <h2>Выбор специальности:</h2>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Специальность:</label> 
                        <select name="specialization_first">
                            { specializationsList?.map(specialization => ( <option key={specialization.id} value={specialization.name}>{specialization.name}</option> )) }
                        </select>
                        {/*
                        <select name="specialization_first">
                            <option value=''>Компьютерные системы и комплексы</option>
                            <option value=''>Монтаж и эксплуатация оборудования и систем газоснабжения</option>
                            <option value=''>Монтаж, наладка и эксплуатация электрооборудования промышленных и гражданских зданий</option>
                            <option value=''>Информационные системы и программирование</option>
                            <option value=''>Почтовая связь</option>
                            <option value=''>Теплоснабжение и теплотехническое оборудование</option>
                            <option value=''>Технология аналитического контроля химических соединений</option>
                            <option value=''>Право и организация социального обеспечения</option>
                            <option value=''>Экономика и бухгалтерский учет (по отраслям)</option>
                            <option value=''>Электромонтажник электрических сетей и электрооборудования</option>
                            <option value=''>Электромонтер по техническому обслуживанию электростанций и сетей</option>
                            <option value=''>Электромонтер по ремонту и обслуживанию электрооборудования (по отраслям)</option>
                            <option value=''>Оператор нефтепереработки</option>
                            <option value=''>Продавец, контролёр-кассир</option>
                            <option value=''>Мастер контрольно-измерительных приборов и автоматики</option>
                            <option value=''>Лаборант-эколог</option>
                            <option value=''>Наладчик компьютерных сетей</option>
                            <option value=''>Техническое обслуживание и ремонт систем и агрегатов автомобилей</option>
                        </select>
                        */}
                        <label className={styles.label}>Резервная специальность:</label> 
                        <select name="specialization_second">
                            { specializationsList?.map(specialization => ( <option key={specialization.id} value={specialization.name}>{specialization.name}</option> )) }
                        </select>
                        {/* 
                        <select name="specialization_second">
                            <option value='Монтаж и эксплуатация оборудования и систем газоснабжения'>Монтаж и эксплуатация оборудования и систем газоснабжения</option>
                            <option value='Монтаж, наладка и эксплуатация электрооборудования промышленных и гражданских зданий'>Монтаж, наладка и эксплуатация электрооборудования промышленных и гражданских зданий</option>
                            <option value='Компьютерные системы и комплексы'>Компьютерные системы и комплексы</option>
                            <option value='Информационные системы и программирование'>Информационные системы и программирование</option>
                            <option value='Почтовая связь'>Почтовая связь</option>
                            <option value='Теплоснабжение и теплотехническое оборудование'>Теплоснабжение и теплотехническое оборудование</option>
                            <option value='Технология аналитического контроля химических соединений'>Технология аналитического контроля химических соединений</option>
                            <option value='Право и организация социального обеспечения'>Право и организация социального обеспечения</option>
                            <option value='Экономика и бухгалтерский учет (по отраслям)'>Экономика и бухгалтерский учет (по отраслям)</option>
                            <option value='Электромонтажник электрических сетей и электрооборудования'>Электромонтажник электрических сетей и электрооборудования</option>
                            <option value='Электромонтер по техническому обслуживанию электростанций и сетей'>Электромонтер по техническому обслуживанию электростанций и сетей</option>
                            <option value='Электромонтер по ремонту и обслуживанию электрооборудования (по отраслям)'>Электромонтер по ремонту и обслуживанию электрооборудования (по отраслям)</option>
                            <option value='Оператор нефтепереработки'>Оператор нефтепереработки</option>
                            <option value='Продавец, контролёр-кассир'>Продавец, контролёр-кассир</option>
                            <option value='Мастер контрольно-измерительных приборов и автоматики'>Мастер контрольно-измерительных приборов и автоматики</option>
                            <option value='Лаборант-эколог'>Лаборант-эколог</option>
                            <option value='Наладчик компьютерных сетей'>Наладчик компьютерных сетей</option>
                            <option value='Техническое обслуживание и ремонт систем и агрегатов автомобилей'>Техническое обслуживание и ремонт систем и агрегатов автомобилей</option>
                        </select>
                        */}
                    </li>
                    <fieldset>
                        <legend>Форма обучения:</legend>
                        <input type="radio" name="form_education" value="ОЧНОЙ" required/>
                        <label>ОЧНАЯ</label>
                        <input type="radio" name="form_education" value="ЗАОЧНОЙ"/>
                        <label>ЗАОЧНАЯ</label>
                    </fieldset>
                    {/* 
                    <fieldset>
                        <legend>Форма обучения:</legend>
                        {specializationsList?.map((spec) => (
                            <div key={spec.id}>
                            <input type="radio" name="form_education" value={spec.form_education} required />
                            <label>{spec.form_education}</label>
                            </div>
                        ))}
                    </fieldset>*/}
                    <fieldset>
                        <legend>Место:</legend>
                        <input type="radio" name="form_education_pay" value="финансируемые из средств краевого бюджета" required/>
                        <label>За счет ассингнованных средств краевого бюджета</label>
                        <input type="radio" name="form_education_pay" value="по договорам с оплатой стоимости обучения"/>
                        <label>Договор с оплатой стоимости обучения</label>
                    </fieldset>
                    <h2>Информация об образовательном учреждении:</h2>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Образовательное учреждение:</label> 
                        <input type="text" name="education_complete_name" placeholder="НАИМЕНОВАНИЕ УЧЕБНОГО ЗАВЕДЕНИЯ, ЧТО ЗАКОНЧИЛИ" autoComplete="off" required/>
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Год окончания:</label> 
                        <input type="number" min="1990" max="2099" name="education_complete_year" placeholder="2022" autoComplete="off" required/>
                        <label className={styles.label}>Полученное образование:</label> 
                        <select name="education_complete_category">
                            <option value='СРЕДНЕЕ ОБЩЕЕ'>СРЕДНЕЕ ОБЩЕЕ - 11 КЛАССОВ</option>
                            <option value='ОСНОВНОЕ ОБЩЕЕ'>ОСНОВНОЕ ОБЩЕЕ - 9 КЛАССОВ</option>
                            <option value='СРЕДНЕЕ ПРОФЕССИОНАЛЬНОЕ'>СРЕДНЕЕ ПРОФЕССИОНАЛЬНОЕ - КОЛЛЕДЖ</option>
                            <option value='НАЧАЛЬНОЕ ПРОФЕССИОНАЛЬНОЕ'>НАЧАЛЬНОЕ ПРОФЕССИОНАЛЬНОЕ - УЧИЛИЩЕ</option>
                        </select>
                    </li>
                    <fieldset>
                        <legend>Документ, подтверждающий полученное образование:</legend>
                        <input type="radio" name="education_complete_document" value="АТТЕСТАТ" required/>
                        <label>АТТЕСТАТ</label>
                        <input type="radio" name="education_complete_document" value="ДИПЛОМ"/>
                        <label>ДИПЛОМ</label>
                    </fieldset>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Серия:</label> 
                        <input type="text" name="education_complete_seria" autoComplete="off"/>
                        <label className={styles.label}>Номер:</label> 
                        <input type="number" name="education_complete_number" autoComplete="off" required/>
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Дата выдачи:</label> 
                        <input type="date" name="education_complete_date" autoComplete="off" required/>
                        <label className={styles.label}>Поданный документ:</label> 
                        <select name="education_complete_type">
                            <option value='ОРИГИНАЛ'>ОРИГИНАЛ ДОКУМЕНТА ОБ ОБРАЗОВАНИИ</option>
                            <option value='КОПИЯ'>КСЕРОКОПИЯ ДОКУМЕНТА ОБ ОБРАЗОВАНИИ</option>
                        </select>
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Количество троек:</label> 
                        <input type="text" name="tree" autoComplete="off" maxLength={2} placeholder="7" required/>
                        <label className={styles.label}>Четверок:</label> 
                        <input type="text" name="four" autoComplete="off" maxLength={2} placeholder="6" required/>
                        <label className={styles.label}>Пятерок:</label> 
                        <input type="text" name="five" autoComplete="off" maxLength={2} placeholder="8" required/>
                    </li>
                    <fieldset>
                        <legend>Медаль:</legend>
                        <input type="radio" name="medal" value="Медаль (аттестат, диплом c «отличием»)" required/>
                        <label>ЕСТЬ</label>
                        <input type="radio" name="medal" value="МЕДАЛИ НЕТ"/>
                        <label>НЕТ</label>
                    </fieldset>
                    <fieldset>
                        <legend>Победы в олимпиадах:</legend>
                        <input type="radio" name="olympiad" value="Победитель всероссийских (региональных) олимпиад (член сборной)" required/>
                        <label>ПОБЕДИТЕЛЬ ОЛИМПИАД</label>
                        <input type="radio" name="olympiad" value="ПОБЕДЫ В ОЛПИМПИАДАХ ОТСУТСТВУЮТ"/>
                        <label>ПОБЕДЫ В ОЛПИМПИАДАХ ОТСУТСТВУЮТ</label>
                    </fieldset>
                    <h2>Информация о работе:</h2>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Трудовой стаж, лет:</label> 
                        <input type="number" name="work_stage_year" max="99" placeholder="1" autoComplete="off"/>
                        <label className={styles.label}>месяцев:</label> 
                        <input type="number" name="work_stage_month" max="12" placeholder="6" autoComplete="off"/>
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Место работы, занимаемая должность для заочников:</label> 
                        <input type="text" name="work_place_post" placeholder="МЕСТО РАБОТЫ, ЗАНИМАЕМАЯ ДОЛЖНОСТЬ ДЛЯ ЗАОЧНИКОВ" autoComplete="off"/>
                    </li>
                    <fieldset>
                        <legend>В общежитии:</legend>
                        <input type="radio" name="house" value="НУЖДАЮСЬ" required/>
                        <label>НУЖДАЮСЬ</label>
                        <input type="radio" name="house" value="НЕ НУЖДАЮСЬ"/>
                        <label>НЕ НУЖДАЮСЬ</label>
                    </fieldset>
                    <li className={styles.formrow}>
                        <label className={styles.label}>СНИЛС:</label> 
                        <input type="text" name="snils" placeholder="000-000-000 00" autoComplete="off" required/>
                        <label className={styles.label}>Мед полис:</label> 
                        <input type="text" name="inn" maxLength={16} placeholder="0000000000000000" autoComplete="off" required/>
                    </li>
                    <fieldset>
                        <legend>Среднее профессиональное образование (СПО) получаю:</legend>
                        <input type="radio" name="education_spo" value="ВПЕРВЫЕ" required/>
                        <label>ВПЕРВЫЕ</label>
                        <input type="radio" name="education_spo" value="НЕ ВПЕРВЫЕ"/>
                        <label>НЕ ВПЕРВЫЕ</label>
                    </fieldset>

                    <h2>Сведения о матери:</h2>
                    <li className={styles.formrow}>
                        <label className={styles.label}>ФИО:</label> 
                        <input type="text" name="parent_mother_initial" placeholder="ИВАНЕНКО ВИКТОРИЯ ВИКТОРОВНА" autoComplete="off"/>
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Место работы:</label> 
                        <input type="text" name="parent_mother_work" placeholder="ООО <<АТЕЛЬЕ>>" autoComplete="off"/>
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Должность:</label> 
                        <input type="text" name="parent_mother_work_post" placeholder="ЗАМЕСТИТЕЛЬ ДИРЕКТОРА" autoComplete="off"/>
                        <label className={styles.label}>Номер телефона:</label> 
                        <input type="tel" name="parent_mother_phone" maxLength={12} placeholder="89343543526" autoComplete="off"/>
                    </li>

                    <h2>Сведения об отце:</h2>
                    <li className={styles.formrow}>
                        <label className={styles.label}>ФИО:</label> 
                        <input type="text" name="parent_father_initial" placeholder="ИВАНЕНКО ВИКТОР МИЛИТОРОВИЧ" autoComplete="off"/>
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Место работы:</label> 
                        <input type="text" name="parent_father_work" placeholder="ЗАВОД ДАЛЬДИЗЕЛЬ" autoComplete="off"/>
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Должность:</label> 
                        <input type="text" name="parent_father_work_post" placeholder="ИНЖЕНЕР ПО НЕФТЕГАЗОВЫМ УСТАНОВКАМ" autoComplete="off"/>
                        <label className={styles.label}>Номер телефона:</label> 
                        <input type="tel" name="parent_father_phone" maxLength={12} placeholder="89343543526" autoComplete="off"/>
                    </li>
                    
                    <h2>Дополнительная информация о себе:</h2>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Интересы, увлечения, хобби:</label> 
                        <input type="text" name="hobby" placeholder="ВАШИ ИНТЕРЕСЫ" autoComplete="off"/>
                        <label className={styles.label}>Приписка к следующему военкомату:</label> 
                        <input type="text" name="army" placeholder="УЧЕТ В КАКОМ ВОЕНКОМАТЕ?" autoComplete="off"/>
                    </li>
                    <li className={styles.formrow}>
                        <label className={styles.label}>Вид спорта:</label> 
                        <input type="text" name="sport" placeholder="БАСКЕТБОЛ" autoComplete="off"/>
                        <label className={styles.label}>Спортивный разряд:</label> 
                        <input type="text" name="sport_level" placeholder="КМС" autoComplete="off"/>
                    </li>
                    <fieldset>
                        <legend>Согласие на обработку персональных данных:</legend>
                        <input type="radio" name="success" value="СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ ДАЮ" required/>
                        <label>ДАЮ</label>
                        <input type="radio" name="success" value="СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ НЕ ДАЮ"/>
                        <label>НЕ ДАЮ</label>
                    </fieldset>
                    <li className={styles.formrow}>
                        <button type="submit">Отправить</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}