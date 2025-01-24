import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { //extends を使うことで、標準属性の型チェックをTypeScriptが自動で行ってくれる
  className?: string // 追加のクラス名（オプショナル）
}
//----HTMLAttributes は、HTML要素が持つすべての標準的な属性を型として定義したもの

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => { //分割代入
  return (
    <button
      className={`border-[0.5px] border-text-900 text-white bg-sub-400 hover:bg-sub-500 font-bold rounded-lg text-xs px-5 py-2.5 mt-4 mb-12 ${
        className || ''
      }`}//親コンポーネントから className が渡されていれば、それをボタンに追加。渡されていなければ空文字列を使う。これによりカスタムスタイルを追加する
      {...props}//受け取ったその他の属性（onClick や disabledなど）をボタンにそのまま渡す
    >
      {children}
    </button>
  )
}

export default Button
