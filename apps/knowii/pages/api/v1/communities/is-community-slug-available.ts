import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  errorClientNotAuthenticated,
  errorInternalServerError,
  hasErrorMessage,
  getLogger,
  IsCommunitySlugAvailableResponse,
  errorInputValidation,
  isCommunitySlugAvailableRequestSchema,
} from '@knowii/common';
import { PrismaClient } from '@prisma/client';
import { daoFnIsCommunitySlugAvailable, errorMessageOptions } from '@knowii/server';
import { generateErrorMessage } from 'zod-error';

export default async function handler(req: NextApiRequest, res: NextApiResponse<IsCommunitySlugAvailableResponse>) {
  const logger = getLogger('communities', req.url!);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  logger.info('Handling request');

  const supabaseClient = createServerSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) {
    return res.status(401).json({
      error: errorClientNotAuthenticated.code,
      errorDescription: errorClientNotAuthenticated.description,
    });
  }

  const requestValidationResult = isCommunitySlugAvailableRequestSchema.safeParse(req.body);

  if (!requestValidationResult.success) {
    const errorMessage = generateErrorMessage(requestValidationResult.error.issues, errorMessageOptions);
    logger.warn(`${errorInputValidation.description}. Error(s) detected: %s`, errorMessage);

    res.status(400).json({
      error: errorInputValidation.code,
      errorDescription: errorInputValidation.description,
      errorDetails: errorMessage,
    });
    return;
  }

  logger.info('Request validated. Data: %o', requestValidationResult.data);

  const { slugToCheck } = requestValidationResult.data;

  try {
    const prismaClient = new PrismaClient();

    const isSlugAvailable = await daoFnIsCommunitySlugAvailable(slugToCheck, prismaClient);

    logger.info('Community slug is %s', isSlugAvailable ? 'available' : 'not available');

    const responseBody: IsCommunitySlugAvailableResponse = {
      isSlugAvailable,
    };

    return res.status(200).json(responseBody);
  } catch (err: unknown) {
    if (hasErrorMessage(err)) {
      logger.warn('Error while checking for community slug availability: %', err.message);
      res.status(500).json({
        error: errorInternalServerError.code,
        errorDescription: errorInternalServerError.description,
      });
      return;
    }

    logger.warn('Error while checking for community slug availability: %o', err);
    res.status(500).json({
      error: errorInternalServerError.code,
      errorDescription: errorInternalServerError.description,
    });
  }
}