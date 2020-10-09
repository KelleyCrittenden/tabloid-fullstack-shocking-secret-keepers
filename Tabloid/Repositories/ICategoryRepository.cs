using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        void Add(Category category);
        void DeleteCategory(int id);
        List<Category> GetAll();
        Category GetCategoryById(int id);
        void UpdateCategory(Category category);
    }
}