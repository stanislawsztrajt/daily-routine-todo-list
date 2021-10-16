import React from 'react'

interface Itodo{
  title: string;
  body: string;
  date: string;
  id: string;
}


interface Iicon{
  icon: object|string;
  selected: boolean;
  id: string;
}

type Props = {
  icon: any
  selectIcon: (id: string) => void;
};

const Icons: React.FC<Props> = ({
  icon,
  selectIcon,
}) =>{

  return(
    <div
      key={icon.id}
      onClick={() => selectIcon(icon.id)}
      className={`
      mt-4 ml-4 w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 m
      b-4 flex-shrink-0 cursor-pointer hover:opacity-80 duration-150 ${icon.selected === true ? ' border-4 border-yellow-500' : null}`}
    >
      {icon.icon}
    </div>
  )
}

export default Icons;