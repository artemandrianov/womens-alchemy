import { defineMiddleware } from 'astro:middleware'
import { getActionContext } from 'astro:actions'

export const onRequest = defineMiddleware(async (context, next) => {
  const { action, setActionResult, serializeActionResult } = getActionContext(context)
  if (action?.calledFrom === 'form') {
    const result = await action.handler()
    if (result?.error === undefined) {
      return Response.redirect(new URL('/', context.request.url), 303)
    }
    setActionResult(action.name, serializeActionResult(result))
  }
  return next()
})