import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { clx } from '../helpers/classnames'
import styles from './Select.module.css'

type Props = {
  options: Array<{ value: string; title: string }>
  value: any | null
  onChange: React.Dispatch<React.SetStateAction<Props['value']>>
  placeholder?: string
}

const Select = ({
  options: opts,
  value,
  onChange,
  placeholder: defaultPlaceHolder,
}: Props) => {
  const [opened, setOpened] = useState(false)
  const [focused, setFocused] = useState<null | number>(null)
  const [inputValue, setinputValue] = useState('')
  const onSelect: React.MouseEventHandler<HTMLLIElement> = (e) => {
    // @ts-ignore
    const value = e.target.getAttribute('value')
    onChange(value)
  }
  const select = useRef<null | HTMLDivElement>(null)

  const openMenu = () => setOpened(true)
  const collapseMenu = () => {
    setOpened(false)
    setinputValue('')
  }

  const options = useMemo(
    () =>
      opts.filter((o) => {
        const reg = new RegExp(inputValue, 'i')
        return reg.test(o.title)
      }),
    [inputValue, opts]
  )

  const handleClick = useCallback(
    (e) => {
      const path = e.composedPath()
      if (opened && select.current && !path.includes(select.current)) {
        collapseMenu()
      }
    },
    [opened]
  )

  const handleKeyboard = useCallback(
    (e) => {
      if (e.code === 'Escape' && opened) collapseMenu()
      else if (e.code === 'ArrowDown' && opened)
        setFocused((prev) => {
          const n = prev !== null ? prev + 1 : 0
          if (n >= options.length - 1) return options.length - 1
          return n
        })
      else if (e.code === 'ArrowUp' && opened)
        setFocused((prev) => {
          const n = prev !== null ? prev - 1 : options.length - 1
          if (n <= 0) return 0
          return n
        })
      else if (e.code === 'Enter' && opened && focused !== null) {
        e.preventDefault()
        onChange(options[focused].value)
      }
    },
    [opened, focused, options]
  )

  useEffect(() => {
    window.addEventListener('click', handleClick)
    window.addEventListener('keydown', handleKeyboard)

    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('keydown', handleKeyboard)
    }
  }, [handleClick, handleKeyboard])

  useEffect(() => collapseMenu(), [value])
  const handleFocus = (i: number) => setFocused(i)

  const placeholder = value
    ? options.find((o) => o.value === value)?.title
    : defaultPlaceHolder || 'Select'

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setinputValue(e.target.value)

  return (
    <div className={styles.select} ref={select}>
      <input
        className={styles.field}
        placeholder={placeholder}
        onClick={openMenu}
        value={inputValue}
        onChange={onInputChange}
      />
      <ul
        className={clx({
          [styles.menu]: true,
          [styles.open]: opened,
        })}
      >
        {options.map((o, i) => (
          <li
            key={o.value}
            className={clx({
              [styles.option]: true,
              [styles.selected]: value === o.value,
              [styles.focused]: i === focused,
            })}
            onClick={onSelect}
            onMouseOver={() => handleFocus(i)}
            onMouseOut={() => setFocused(null)}
            value={o.value}
          >
            {o.title || o.value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Select
