import { AuthEnum } from 'src/modules/tenantUser/enum/auth.enum';
import * as yup from 'yup';
import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();
export const loginTenantSchema = yup.object().shape({
  email: yup
    .string()
    .email(AuthEnum.INVALID_EMAIL)
    .required(AuthEnum.REQUIRED_FIELDS),
  password: yup
    .string()
    .required(AuthEnum.REQUIRED_FIELDS)
    .min(6, AuthEnum.PASSWORD_MIN_LENGTH),
});

export const createUserSchema = yup.object().shape({
  name: yup.string().required(AuthEnum.REQUIRED_FIELDS),
  email: yup
    .string()
    .email(AuthEnum.INVALID_EMAIL)
    .required(AuthEnum.REQUIRED_FIELDS),
  roleId: yup.number().test({
    name: 'valid-form',
    message: AuthEnum.INVALID_ROLE,
    async test(value) {
      if (!value) return true;
      const record = await prisma.roles.findFirst({
        where: {
          deleted: false,
          id: value,
        },
      });
      return !record || !record.id ? Boolean(0) : Boolean(1);
    },
  }),
  password: yup
    .string()
    .required(AuthEnum.REQUIRED_FIELDS)
    .min(6, AuthEnum.PASSWORD_MIN_LENGTH),
});

export const updateUserSchema = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email(AuthEnum.INVALID_EMAIL).notRequired(),
  roleId: yup.number().test({
    name: 'valid-form',
    message: AuthEnum.INVALID_ROLE,
    async test(value) {
      if (!value) return true;
      const record = await prisma.roles.findFirst({
        where: {
          deleted: false,
          id: value,
        },
      });
      return !record || !record.id ? Boolean(0) : Boolean(1);
    },
  }),
  password: yup.string().notRequired().min(6, AuthEnum.PASSWORD_MIN_LENGTH),
});
