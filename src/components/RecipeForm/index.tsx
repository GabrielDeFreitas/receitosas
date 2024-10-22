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
  description: z.string().nonempty('a descrição é obrigatorio'),
  preparation_time: z.string().min(6, 'mínimo 6 caracteres').nonempty('campo obrigatório'),
  cooking_time: z.string().min(6, 'mínimo 6 caracteres').nonempty('campo obrigatório'),
  servings: z.string().min(6, 'mínimo 6 caracteres').nonempty('campo obrigatório'),
  preparation: z
    .array(
      z.object({
        preparation: z.string().nonempty('campo obrigatório'),
      }),
    )
    .min(2, 'insira pelo menos 2 preparações'),
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
    name: 'preparation',
  });

  function createRecipe(data: CreateUserFormData) {
    const preparationWithOrder = data.preparation.map((prep, index) => ({
      order: index + 1,
      preparation: prep.preparation,
    }));

    const result = {
      ...data,
      preparation: preparationWithOrder,
    };

    setOutput(JSON.stringify(result, null, 2));
  }

  function addNewTech() {
    append({ preparation: '' });
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
            <label htmlFor="description">Description</label>
            <input {...register('description')} className="border border-zinc-600" type="text" />
            {errors.description && <span>{errors.description.message}</span>}
          </div>
          <div>
            <label htmlFor="preparation_time">Preparation time</label>
            <input {...register('preparation_time')} className="border border-zinc-600" type="text" />
            {errors.preparation_time && <span>{errors.preparation_time.message}</span>}
          </div>
          <div>
            <label htmlFor="cooking_time">Cooking time</label>
            <input {...register('cooking_time')} className="border border-zinc-600" type="text" />
            {errors.cooking_time && <span>{errors.cooking_time.message}</span>}
          </div>
          <div>
            <label htmlFor="servings">Servings</label>
            <input {...register('servings')} className="border border-zinc-600" type="text" />
            {errors.servings && <span>{errors.servings.message}</span>}
          </div>
          <div>
            <label htmlFor="preparation">
              Preparation
              <button type="button" onClick={addNewTech} className="bg-emerald-500 rounded font-semibold p-1">
                adicionar
              </button>
            </label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <span>{`Order: ${index + 1}`}</span>
                <input
                  {...register(`preparation.${index}.preparation`)}
                  className="border border-zinc-600"
                  type="text"
                />
                {errors.preparation?.[index]?.preparation && (
                  <span>{errors.preparation[index].preparation.message}</span>
                )}
                <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white rounded p-1">
                  Remover
                </button>
              </div>
            ))}
            {errors.preparation && <span>{errors.preparation.message}</span>}
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
