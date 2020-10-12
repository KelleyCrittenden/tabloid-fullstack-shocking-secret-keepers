using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);

        List<UserProfile> GetAllUserProfiles();
        UserProfile GetUserProfileById(int id);


    }
}