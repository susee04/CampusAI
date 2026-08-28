/**
 * Standard, predictable API response shape.
 * Every controller returns this structure for consistency.
 */
export function sendSuccess(res, data, message = 'OK', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(res, message = 'Internal server error', statusCode = 500, errors = null) {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(statusCode).json(body);
}

export function paginated(res, items, total, page, limit) {
  return res.status(200).json({
    success: true,
    message: 'OK',
    data: {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
}
