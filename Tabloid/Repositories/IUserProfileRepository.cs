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

        public void DeactivateProfile(int id);

        void ReactivateProfile(int id);
        List<UserProfile> GetAllDeactivatedUserProfiles();
        public void EditUserType(UserProfile user);
        public List<UserType> GetAllUserTypes();
        public List<UserProfile> GetAllAdminUserProfiles();
    }
}