import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Specialization } from '@prisma/client';

type Props = {
  specializations: Specialization[];
};

const Specializations: React.FC<Props> = ({ specializations }) => {
  const [name, setName] = useState('');
  const [formEducation, setFormEducation] = useState<string[]>([]);
  const [formEducationPay, setFormEducationPay] = useState<string[]>([]);
  const [formEducationCompleteCategory, setFormEducationCompleteCategory] = useState<string[]>([]); 
  const [editingId, setEditingId] = useState<number | null>(null);
  const [specializationsList, setSpecializationsList] = useState(specializations);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSpecializationsList(specializations);
  }, [specializations]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setLoading(true);
    
    if (editingId) {
      // Обновление существующей специализации
      await fetch('/api/specializations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _method: 'PUT',
          id: editingId,
          name,
          form_education: formEducation.join(','),
          form_education_pay: formEducationPay.join(','),
          education_complete_category: formEducationCompleteCategory.join(',')
        }),
      });
      setEditingId(null);
    } else {
      // Создание новой специализации
      await fetch('/api/specializations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _method: 'POST',
          name,
          form_education: formEducation.join(','),
          form_education_pay: formEducationPay.join(','),
          education_complete_category: formEducationCompleteCategory.join(',')
        }),
      });
    }
  
    setLoading(false);
    router.reload();
  };

  const handleEdit = async (id: number) => {
    setLoading(true);
    
    const res = await fetch('/api/specializations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _method: 'SELECTOR',
        id
      }),
    });
    const data = await res.json();
    setName(data.name);
    setFormEducation(data.form_education.split(','));
    setFormEducationPay(data.form_education_pay.split(','));
    setFormEducationCompleteCategory(data.education_complete_category.split(','))
    setEditingId(id);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    await fetch('/api/specializations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _method: 'DELETE',
        id,
      }),
    });
    setSpecializationsList(specializationsList.filter((item) => item.id !== id));
  };

  const handleFormEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (formEducation.includes(value)) {
      setFormEducation(formEducation.filter((item) => item !== value));
    } else {
      setFormEducation([...formEducation, value]);
    }
  };

  const handleFormEducationPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (formEducationPay.includes(value)) {
      setFormEducationPay(formEducationPay.filter((item) => item !== value));
    } else {
      setFormEducationPay([...formEducationPay, value]);
    }
  };
  
  const handleFormEducationCompleteCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (formEducationCompleteCategory.includes(value)) {
      setFormEducationCompleteCategory(formEducationCompleteCategory.filter((item) => item !== value));
    } else {
      setFormEducationCompleteCategory([...formEducationCompleteCategory, value]);
    }
  };

  return (
    <div>
      <h1>Контроль специализаций</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <div>
          <label>Форма обучения: </label>
          <label>
            ОЧНАЯ
            <input type="checkbox" value="ОЧНОЙ" checked={formEducation.includes('ОЧНОЙ')} onChange={handleFormEducationChange} />
          </label>
          <label>
            ЗАОЧНАЯ
            <input type="checkbox" value="ЗАОЧНОЙ" checked={formEducation.includes('ЗАОЧНОЙ')} onChange={handleFormEducationChange} />
          </label>
          <label>
            ЗАОЧНО-ОЧНАЯ
            <input type="checkbox" value="ЗАОЧНО-ОЧНОЙ" checked={formEducation.includes('ЗАОЧНО-ОЧНОЙ')} onChange={handleFormEducationChange} />
          </label>
        </div>
        <div>
          <label>Место: </label>
          <label>
            За счет ассингнованных средств краевого бюджета
            <input type="checkbox" value="финансируемые из средств краевого бюджета" checked={formEducationPay.includes('финансируемые из средств краевого бюджета')} onChange={handleFormEducationPayChange} />
          </label>   
          <label>
            Договор с оплатой стоимости обучения
            <input type="checkbox" value="по договорам с оплатой стоимости обучения" checked={formEducationPay.includes('по договорам с оплатой стоимости обучения')} onChange={handleFormEducationPayChange} />
          </label>
        </div>
        <div>
          <label>Тип образования: </label>
          <label>
            СРЕДНЕЕ ОБЩЕЕ - 11 КЛАССОВ
            <input type="checkbox" value="СРЕДНЕЕ ОБЩЕЕ" checked={formEducationCompleteCategory.includes('СРЕДНЕЕ ОБЩЕЕ')} onChange={handleFormEducationCompleteCategoryChange} />
          </label>   
          <label>
            ОСНОВНОЕ ОБЩЕЕ - 9 КЛАССОВ
            <input type="checkbox" value="ОСНОВНОЕ ОБЩЕЕ" checked={formEducationCompleteCategory.includes('ОСНОВНОЕ ОБЩЕЕ')} onChange={handleFormEducationCompleteCategoryChange} />
          </label>
        </div>
        <button type="submit" disabled={loading}>{editingId ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {specializationsList.map((specialization) => (
          <li key={specialization.id}>
            {specialization.id} - {specialization.name} | {Array.isArray(specialization.form_education) ? specialization.form_education.join(', ') : specialization.form_education} | {Array.isArray(specialization.form_education_pay) ? specialization.form_education_pay.join(', ') : specialization.form_education_pay} | {Array.isArray(specialization.education_complete_category) ? specialization.education_complete_category.join(', ') : specialization.education_complete_category}
            <button onClick={() => handleEdit(specialization.id)}>Edit</button>
            <button onClick={() => handleDelete(specialization.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/specializations`);
  const specializations = await res.json();
  return { props: { specializations } };
};

export default Specializations;