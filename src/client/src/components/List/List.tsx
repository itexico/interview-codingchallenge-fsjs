import React from 'react';
import { format } from 'date-fns';
import { Card } from '..';
import { Link } from 'react-router-dom';
import { EditList } from './EditList';

interface ListProps {
  lists: any;
}

export const List: React.FC<ListProps> = ({ lists }) => {
    
  return (
    <>
      {lists.map((item: any, index: any) => (
        <>
          <Card
            key={index}
            cardHeader={
              <div className='flex items-center justify-between'>
                <span className='text-sm font-light text-gray-600 dark:text-gray-400'>
                  {format(new Date(item.createdAt), 'PP')}
                </span>
                <span className='px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500'>
                  {item.category}
                </span>
              </div>
            }
            cardTitle={<Link to={`lists/${item._id}`}>{item.title}</Link>}
          >
            <p>{item.description}</p>

            <p className='mt-4'>
              <b>Items:</b> {item.numItems}
            </p>

            <div className='flex items-center justify-between mt-4'>
              <Link
                to={`lists/${item._id}`}
                className='text-gray-800 font-semibold dark:text-gray-400 hover:underline'
              >
                View list
              </Link>

              <Link
                to={`lists/edit/${item._id}`}
                className='text-gray-800 font-semibold dark:text-gray-400 hover:underline'
              >
                Edit list
              </Link>
            </div>
          </Card>
        </>
      ))}

      {/* {isShown && (
        <Modal
          title='Edit List'
          actions={
            <ModalConfirmButtons
              isSave
              onConfirm={() => console.log('hey')}
              onCancel={onCancel}
            />
          }
        >
          <>
            {lists.map((item: any, index: number) => (
              <Formik
                initialValues={{
                  title: item.title,
                  description: item.description,
                  category: item.category,
                }}
                onSubmit={async (values) => {
                  console.log(values);

                  const res = await axios.put(
                    `http://localhost:7000/api/lists/${item._id}`,
                    {
                      title: values.title,
                      description: values.description,
                      category: values.category,
                    }
                  );
                  res.data.json();

                  // const { errors } = await createContact({
                  //   variables: { input: values },
                  // });
                  // if (!errors) window.location.reload();
                }}
                key={index}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <Form
                    className='flex flex-col justify-center max-w-full'
                    onSubmit={handleSubmit}
                  >
                    <div className='relative w-full md:w-96'>
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
                    <div className='relative w-full md:w-96'>
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
                    <div className='relative w-full md:w-96'>
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

                    <button type='submit'>Hello</button>
                  </Form>
                )}
              </Formik>
            ))}
          </>
        </Modal>
      )} */}
    </>
  );
};
