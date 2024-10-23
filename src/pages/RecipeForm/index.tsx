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
  preparation_time: z.string().min(2, 'mínimo 2 caracteres').nonempty('campo obrigatório'),
  cooking_time: z.string().min(2, 'mínimo 2 caracteres').nonempty('campo obrigatório'),
  servings: z.string().min(2, 'mínimo 2 caracteres').nonempty('campo obrigatório'),
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
        <div className="gap-4 grid grid-cols-12">
          <div className="border-2 p-4 col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6">
            <form onSubmit={handleSubmit(createRecipe)} className="flex flex-col gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="name">
                  Name
                </label>
                <input
                  {...register('name')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                />
                {errors.name && <span>{errors.name.message}</span>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="description">
                  Description
                </label>
                <input
                  {...register('description')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                />
                {errors.description && <span>{errors.description.message}</span>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="preparation_time">
                  Preparation time
                </label>
                <input
                  {...register('preparation_time')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                />
                {errors.preparation_time && <span>{errors.preparation_time.message}</span>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="cooking_time">
                  Cooking time
                </label>
                <input
                  {...register('cooking_time')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                />
                {errors.cooking_time && <span>{errors.cooking_time.message}</span>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="servings">
                  Servings
                </label>
                <input
                  {...register('servings')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                />
                {errors.servings && <span>{errors.servings.message}</span>}
              </div>
              <div className="flex flex-col gap-4">
                <label
                  className="flex-row flex items-center gap-1 mb-2 text-sm font-medium text-gray-900"
                  htmlFor="preparation"
                >
                  Preparation
                  <button
                    type="button"
                    onClick={addNewTech}
                    className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded"
                  >
                    adicionar
                  </button>
                </label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <span>{index + 1}</span>
                    <input
                      {...register(`preparation.${index}.preparation`)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="text"
                    />
                    {errors.preparation?.[index]?.preparation && (
                      <span>{errors.preparation[index].preparation.message}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                    >
                      Remover
                    </button>
                  </div>
                ))}
                {errors.preparation && <span>{errors.preparation.message}</span>}
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                type="submit"
              >
                Salvar
              </button>
            </form>
          </div>
          <div className="border-2 p-4 col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6">
            <h1>Preview</h1>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
