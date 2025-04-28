type Props = {
  width?: string
  height?: string
  prefix?: string
  name: string
  color?: string
}

const SakuraIcon = (props: Props) => {
  const {width = '16px', height = '16px', prefix = 'icon', name, color} = props
  const symbolId = `#${prefix}-${name}`

  return (
    <svg style={{width, height}}>
      <use href={symbolId} fill={color} />
    </svg>
  )
}

export default SakuraIcon
