import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react'
import Registrator from './registrator';
import styles from '/styles/Home.module.css'
import { Specialization } from '@prisma/client';
export default function Abiturs() {
    const [dataman, setDataMan] = useState([])
    const [data, setData] = useState<any[]>([])
    const [show, setShow] = useState(true)
    const [counter, setCounter] = useState<number | null>(null)
    const colums = {
        id: 'ID:',
        citizenship: 'Гражданство:', 
        passport: 'Документ, удостоверяющий личность:',
        passport_seria: 'Серия паспорта:',
        passport_number: 'Номер паспорта:',
        passport_place: 'Кем выдан паспорта:',
        passport_date: 'Дата выдачи паспорта:',
        firstname: 'Фамилия:',
        name: 'Имя:',
        lastname: 'Отчество:',
        birthday: 'Дата рождения:',
        birthday_place: 'Место Рождения:',
        phone: 'Номер телефона:',
        gender: 'Пол:',
        adress_register: 'Адрес регистрации места жительства:',
        adress_fact: 'Фактический адрес места жительства:',
        email: 'e-mail:',
        language: 'Изучаемый иностранный язык:',
        specialization_first: 'Специальность:',
        specialization_second: 'Резервная специальность:',
        form_education: 'Форма обучения:',
        form_education_pay: 'Место:',
        education_complete_name: 'Образовательное учреждение:',
        education_complete_year: 'Год окончания:',
        education_complete_category: 'Полученное образование:',
        education_complete_document: 'Документ, подтверждающий полученное образование:',
        education_complete_seria: 'Серия документа об образовании:',
        education_complete_number: 'Номер документа об образовании:',
        education_complete_date: 'Дата выдачи документа об образовании:',
        education_complete_type: 'Поданный документ документа об образовании:',
        medal: 'Медаль:',
        olympiad: 'Победы в олимпиадах:',
        work_stage_year: 'Трудовой стаж, лет:',
        work_stage_month: 'Трудовой стаж, месяцев:',
        work_place_post: 'Место работы, занимаемая должность для заочников:',
        house: 'В общежитии:',
        snils: 'СНИЛС:',
        inn: 'Мед полис:',
        education_spo: 'Среднее профессиональное образование (СПО) получаю:',
        parent_mother_initial: 'ФИО матери:',
        parent_mother_work: 'Работа матери:',
        parent_mother_work_post: 'Должность матери:',
        parent_mother_phone: 'Телефон матери:',
        parent_father_initial: 'ФИО отца:',
        parent_father_work: 'Работа отца:',
        parent_father_work_post: 'Должность отца:',
        parent_father_phone: 'Телефон отца:',
        hobby: 'Интересы, увлечения, хобби:',
        army: 'Приписка к следующему военкомату:',
        sport: 'Вид спорта:',
        sport_level: 'Спортивный разряд:',
        success: 'Согласие на обработку персональных данных:',
        tree: 'Количество троек:',
        four: 'Количество четверок:',
        five: 'Количество пятерок:'
    }
    async function componentDidMount() {
        // GET request using fetch with async/await
        const response = await fetch('/api/abbitur');
        const datas = await response.json();
        console.log("Данные об абитуриентах получены")
        setDataMan(datas)
    }
    async function getAb(id: any) {
        // GET request using fetch with async/await
        const response = await fetch('/api/abiturone', {
            body: JSON.stringify({id: id}),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const datas = await response.json();
        console.log(`Данные об абитуриенте подготовлены ${id}`)
        setData(datas)
    }
    async function CreateDoc(id: any) {
        // GET request using fetch with async/await
        const response = await fetch('/api/docx', {
            body: JSON.stringify({id: id}),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const datas = await response.json();
        console.log(`Заявление для абитуриента ${id} создано`)
    }
    useEffect(() => {
        componentDidMount();
    }, []);
    async function Select(id: any) {
        setShow(false)
        console.log(`Открываем карточку абитуриента ${id}`)
        getAb(id)
    }
    async function Doca(id: any) {
        console.log("worked"+id)
        CreateDoc(id)
    }
    async function Back(id: any) {
        setShow(true)
        console.log(`Закрываем карточку абитуриента`)
        await componentDidMount()
        setData([''])
    }
    const ahandleSubmit = async () => {
        const val = document.getElementById('filters')?.value
        const response = await fetch('/api/filter', {
            body: JSON.stringify({specialization_first: val}),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const datas = await response.json();
        console.log(`Применили фильтр ${val}`)
        setDataMan(datas)
        hanleCounter()
    }
    function handleSubmit(e: any) {
        e.preventDefault()
        const { id,
            citizenship, passport, passport_seria,
            passport_number, passport_place, passport_date,
            firstname, name, lastname,
            birthday, birthday_place, phone,
            gender, adress_register, adress_fact,
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
            id: parseInt(id.value),
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
        const res = await fetch('/api/abitured', {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const result = await res.json()
        console.log(`Зарегистрировали нового пользователя ${data.id}`)
        if (result) {
            alert("Успешно отредактировано заявка")
        } else {
            alert("Неуспешно отредактировано" + result)
        }
    }
    async function Deleted(id: any) {
        const quest = await confirm(`Вы точно хотите удалить абитуриента ${id}`)
        if (quest == true) {
            const res = await fetch('/api/deleted', {
                body: JSON.stringify({id}),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            })
            const result = await res.json()
            console.log(`Удалили пользователя ${result.id}`)
            if (result) {
                alert(`Успешно удален абиттуриент ${id}`)
                await componentDidMount()
            } else {
                alert(`Ошибка удаления абиттуриента ${id}`)
            }
        } else {
            alert(`Вы отказались удалить абиттуриента ${id}`)
        }
    }
    const [specializationsList, setSpecializationsList] = useState<Specialization[] | null>(null);
    const hanleGetSpec = async () => {
        const res = await fetch('/api/specializations');
        const data = await res.json();
        setSpecializationsList(data)
    };
    const hanleCounter = async () => {
        const val = document.getElementById('filters')?.value
        const res = await fetch('/api/specializations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              _method: 'COUNTER',
              specialization_first: val
            }),
        });
        const data = await res.json();
        setCounter(data.message)
    };
    const hanleCleared = async () => {
        const res = await fetch('/api/specializations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              _method: 'CLEARED',
            }),
        });
        const data = await res.json();
        setCounter(data.length)
        setDataMan(data)
    };
    useEffect(() => {
        hanleGetSpec()
        hanleCounter()
    }, []);
    function ListAbiturs() {
        if (show) {
            return (
                <div>
                    <h2 className={styles.title}>
                        Поданные заявления аббитуриентов:
                        <label className={styles.card} title='Количество абитуриентов подавших заявления'>👤{counter}</label>
                        <label className={styles.card} onClick={hanleCleared} title='Проверяльщик на то, есть ли абитуриенты с не установленными специфичными специальностями в качестве основной'>🕵️‍♀️</label>
                    </h2>
                    <label className={styles.label}>Специальность:</label> 
                        <select name="specialization_first" id="filters" onChange={ahandleSubmit}>
                            { specializationsList?.map(specialization => ( <option key={specialization.id} value={specialization.name}>{specialization.name}</option> )) }
                        </select>
                        {/** 
                        <select name="specialization_first" id="filters" onChange={ahandleSubmit}>
                            <option value='Компьютерные системы и комплексы'>Компьютерные системы и комплексы</option>
                            <option value='Монтаж и эксплуатация оборудования и систем газоснабжения'>Монтаж и эксплуатация оборудования и систем газоснабжения</option>
                            <option value='Монтаж, наладка и эксплуатация электрооборудования промышленных и гражданских зданий'>Монтаж, наладка и эксплуатация электрооборудования промышленных и гражданских зданий</option>
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
                            <option value='Техническое обслуживание и ремонт систем и агрегатов автомобилей'>Техническое обслуживание и ремонт систем и агрегатов автомобилей</option>
                        </select>*/}
                    <div className={styles.grid}>
                    {dataman.slice().reverse().map((key) => (
                        <div className={styles.card}>
                            <div>
                                <label>ID: {key['id']} </label>
                                <label>ФИО: {key['firstname']} </label>
                                <label> {key['name']} </label>
                                <label> {key['lastname']} </label>
                                <button onClick={()=>{Deleted(key['id'])}}>🚫</button><hr/>
                            </div>
                            <div>
                                <label>Желаемая специальность: {key['specialization_first']} </label><br/>
                                <label>Запасная специальность {key['specialization_second']} </label><br/>
                                <label>Поданные документы: {key['education_complete_type']} </label>
                                <label>Образование: {key['education_complete_category']} </label>
                                <br/><label>Общежитие: {key['house']} </label>
                                <label>Формы обучения: {key['form_education']} </label>
                                
                                <label> Средняя оценка аттестата: {((parseInt(key.tree)*3+parseInt(key.four)*4+parseInt(key.five)*5)/(parseInt(key.tree)+parseInt(key.four)+parseInt(key.five))).toFixed(2)}</label><hr/>
                            </div>
                            <button onClick={() => Select(key['id'])}>Подрбонее</button>
                            <button onClick={() => CreateDoc(key['id'])}>Сформировать заявление</button>
                            <a target="_blank" href={`./files/${key['id']}_${key['firstname']}_${key['name']}_${key['lastname']}.docx`} download>
                                <Link href={`./files/${key['id']}_${key['firstname']}_${key['name']}_${key['lastname']}.docx`} target="_blank">
                                <button>Открыть заявление</button></Link></a>
                        </div>
                    ))}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h2 className={styles.title}>Заявление аббитуриента:</h2>
                    <button onClick={Back}>Назад</button>
                    <ul className={styles.wrapper}>
                        <form onSubmit={handleSubmit}>
                        {Object.keys(data).map((innerAttr: any, index) => {
                            return (
                                <div className={styles.card}>
                                <li className={styles.formrow}>
                                    <label>{colums[`${innerAttr}`]}</label>
                                    <input id={innerAttr} name={innerAttr} type="text" defaultValue={data[innerAttr]}/>
                                </li>
                                </div>
                            )})
                        }
                        <li className={styles.formrow}>
                            <button type="submit">Отправить</button>
                        </li>
                        </form>
                    </ul>
                    <div className={styles.grid}>
                    
                        <button onClick={Back}>Назад</button>
                    </div>
                </div>
            )
        }
    }
    
    return (
        <div>
            {ListAbiturs()}
        </div>
    );
}