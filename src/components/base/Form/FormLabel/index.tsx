import React from 'react'

type FormLabelProps = {
    htmlFor: string,
    children: React.ReactNode
}

const FormLabel: React.FC<FormLabelProps> = ({ htmlFor, children }) => (
    <label className="ml-1 text-sm mb-1 capitalize" htmlFor={htmlFor}>{children}</label>
)

export default FormLabel;
