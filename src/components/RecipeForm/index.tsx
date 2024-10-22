import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const createRecipeFormSchema = z.object({
  name: z
    .string()
    .nonempty('o nome é obrigatorio')
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(' ');
    }),
  email: z.string().nonempty('o email é obrigatorio').email('formato de email invalido'),
  password: z.string().min(6, 'a senha precisa de no minimio 6 caracteres'),
  techs: z
    .array(
      z.object({
        title: z.string().nonempty('o titulo é obrigatorio'),
        knowledge: z
          .number()
          .min(4, 'O conhecimento deve ser pelo menos 1')
          .max(10, 'O conhecimento deve ser no máximo 2'),
      }),
    )
    .min(2, 'insira pelo menos 2 tecnologias'),
});

type CreateUserFormData = z.infer<typeof createRecipeFormSchema>;

export function RecipeForm() {
  const [output, setOutput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createRecipeFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techs',
  });

  function createRecipe(data: CreateUserFormData) {
    setOutput(JSON.stringify(data, null, 2));
  }

  function addNewTech() {
    append({ title: '', knowledge: 0 });
  }

  return (
    <>
      <div className="border-2 p-4 col-span-12">
        <form onSubmit={handleSubmit(createRecipe)}>
          <div>
            <label htmlFor="name">Name</label>
            <input {...register('name')} className="border border-zinc-600" type="text" />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input {...register('email')} className="border border-zinc-600" type="email" />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input {...register('password')} className="border border-zinc-600" type="password" />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <div>
            <label htmlFor="techs">
              Tecnologias
              <button type="button" onClick={addNewTech} className="bg-emerald-500 rounded font-semibold p-1">
                adicionar
              </button>
            </label>
            {fields.map((field, index) => (
              <div key={field.id}>
                <input {...register(`techs.${index}.title`)} className="border border-zinc-600" type="text" />
                {errors.techs?.[index]?.title && <span>{errors.techs[index].title.message}</span>}

                <input
                  {...register(`techs.${index}.knowledge`, { valueAsNumber: true })}
                  className="border border-zinc-600"
                  type="number"
                />
                {errors.techs?.[index]?.knowledge && <span>{errors.techs[index].knowledge.message}</span>}
              </div>
            ))}
            {errors.techs && <span>{errors.techs.message}</span>}
          </div>

          <button className="bg-emerald-500 rounded font-semibold p-1" type="submit">
            Salvar
          </button>
        </form>
        <pre>{output}</pre>
      </div>
    </>
  );
}
