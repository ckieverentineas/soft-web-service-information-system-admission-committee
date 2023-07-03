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

  return (
    <div>
      <h1>Specializations</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <div>
        <label>
          Full-time
          <input type="checkbox" value="full-time" checked={formEducation.includes('full-time')} onChange={handleFormEducationChange} />
        </label>
        <label>
          Part-time
          <input type="checkbox" value="part-time" checked={formEducation.includes('part-time')} onChange={handleFormEducationChange} />
        </label>
        <label>
          Distance
          <input type="checkbox" value="distance" checked={formEducation.includes('distance')} onChange={handleFormEducationChange} />
        </label>
      </div>
      <label>
        Budget
        <input type="checkbox" value="budget" checked={formEducationPay.includes('budget')} onChange={handleFormEducationPayChange} />
      </label>   
      <label>
        Commercial
        <input type="checkbox" value="commercial" checked={formEducationPay.includes('commercial')} onChange={handleFormEducationPayChange} />
      </label>
          <button type="submit" disabled={loading}>{editingId ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {specializationsList.map((specialization) => (
          <li key={specialization.id}>
            {specialization.id} - {specialization.name} | {Array.isArray(specialization.form_education) ? specialization.form_education.join(', ') : specialization.form_education} | {Array.isArray(specialization.form_education_pay) ? specialization.form_education_pay.join(', ') : specialization.form_education_pay}
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