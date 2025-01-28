import React from 'react'

interface LabelProps {
  htmlFor: string // 紐づける入力要素のID
  children: React.ReactNode // ラベルのテキストや要素　
  // コンポーネントに渡される子要素（children）が 任意の型 である可能性があるため、React.ReactNode 型を使用することが一般的
  className?: string // 追加のクラス名（オプショナル）
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block mb-2 text-xs font-medium text-text-900 ${className || ''}`}
    >
      {children}
    </label>
  )
}

export default Label

//children を React.ReactNode にする理由は、React コンポーネントが渡されるあらゆる形式のコンテンツ（文字列、JSX 要素、配列、null など）
//を柔軟に受け入れる必要があるから。コンポーネントの再利用性や柔軟性を大幅に向上する
