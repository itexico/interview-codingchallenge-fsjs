export const Loader = () => {
  return (
    <div className='flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen'>
      <div className='flex flex-col items-center w-28'>
        <div className='flex space-x-2 animate-pulse'>
          <div className='w-3 h-3 bg-gray-500 rounded-full'></div>
          <div className='w-3 h-3 bg-gray-500 rounded-full'></div>
          <div className='w-3 h-3 bg-gray-500 rounded-full'></div>
        </div>
        <p className='font-bold'>Loading...</p>
      </div>
    </div>
  );
};
