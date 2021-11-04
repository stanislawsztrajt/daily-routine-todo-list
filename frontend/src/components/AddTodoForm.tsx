import React from 'react'

interface Itodo{
  title: string;
  body: string;
  date: string;
  id: string;
}

type Props = {
  values: any;
  minDateValue: any;
  handleSubmit: (e: any) => void;
  handleChange: (e: any) => void;
};

const AddTodoForm: React.FC<Props> = ({
  values,
  minDateValue,
  handleSubmit,
  handleChange
}) =>{

  return(
    <form
      className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
      onSubmit={handleSubmit}
    >
      {/* <div className=" mt-4 ml-4 w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4 flex-shrink-0"> */}
        {/* <IIIcon classes={{root: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"}}>
        </IIIcon> */}
      {/* </div> */}
      <div className="items-center md:flex">
        <div className="w-full mr-2">
          <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
            Title
          </label>
          <input
            name="title"
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            type="text"
            value={values.title}
            onChange={handleChange}
          />
        </div>

        <div className="w-full mt-4 md:ml-2 md:mt-0">
          <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Time</label>
          <input
            type="time"
            id="date"
            name="date"
            min={minDateValue}
            value={values.date}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="w-full mt-4">
        <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Body</label>
        <textarea
          name="body"
          id="body"
          className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          value={values.body}
          onChange={handleChange}
        >
        </textarea>
      </div>

      <div className="flex justify-center mt-6">
        <input
          className="cursor-pointer px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          value="add to do"
          type="submit"
        />
      </div>
    </form>
  )
}

export default AddTodoForm;