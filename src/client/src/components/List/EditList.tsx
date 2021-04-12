import axios from 'axios';
import { Form, Formik } from 'formik';
import React from 'react';
import { PageHeader } from '..';
import { Container } from '../Container/Container';
import { Input } from '../Input/Input';

interface EditListProps {
  items: any;
}

export const EditList: React.FC<EditListProps> = ({ items }) => {
  return (
    <Container>
      <>
        <PageHeader title={`Editing: ${items.title}`} />
        <Formik
          initialValues={{
            title: items.title,
            description: items.description,
            category: items.category,
          }}
          onSubmit={async (values) => {
            console.log(values);
            const res = await axios.put(
              `http://localhost:7000/api/lists/${items._id}`,
              {
                title: values.title,
                description: values.description,
                category: values.category,
              }
            );
            res.data.json();
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form className='mt-10' onSubmit={handleSubmit}>
              <div className='relative'>
                <Input
                  label='Name'
                  labelColor='black'
                  focusColor='black'
                  textAlign='text-left'
                  htmlFor='List title'
                  type='text'
                  id='title'
                  value={values.title}
                  onChange={handleChange}
                  name='title'
                />
              </div>
              <div className='relative'>
                <Input
                  label='Description'
                  labelColor='black'
                  focusColor='black'
                  textAlign='text-left'
                  htmlFor='List description'
                  type='text'
                  id='description'
                  value={values.description}
                  onChange={handleChange}
                  name='description'
                />
              </div>
              <div className='relative'>
                <Input
                  label='Category'
                  labelColor='black'
                  focusColor='black'
                  textAlign='text-left'
                  htmlFor='List category'
                  type='text'
                  id='category'
                  value={values.category}
                  onChange={handleChange}
                  name='category'
                />
              </div>

              <button
                type='submit'
                className='px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-600 rounded-md dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-500 dark:focus:bg-gray-700'
              >
                Update
              </button>
            </Form>
          )}
        </Formik>
      </>
    </Container>
  );
};
