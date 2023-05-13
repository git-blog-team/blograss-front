interface IInputProps {
    type?: 'text' | 'password' | 'number' | 'email';
    placeholder?: string;
    id?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

export default function Input({
    type = 'text',
    placeholder,
    id,
    onChange,
    value,
}: IInputProps) {
    return (
        <>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </>
    );
}
