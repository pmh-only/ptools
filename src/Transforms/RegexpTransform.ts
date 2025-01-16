import { Transform } from './Transform'

export const RegexpTransform: Transform = {
  name: 'regexp',
  fn: async (v) => {
    const [expression, samples] = v.split('\n\n')
    const regexp = new RegExp(expression)

    const parsedSamples = samples
      .split('\n')
      .map((sample) => JSON.stringify(regexp.exec(sample)?.groups))
      .join('\n')

    return [expression, samples, parsedSamples].join('\n\n')
  },
}
