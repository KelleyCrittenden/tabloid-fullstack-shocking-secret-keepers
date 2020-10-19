Use [Tabloid]
Go
DROP TABLE IF EXISTS [PostReaction];
DROP TABLE IF EXISTS [Reaction];

CREATE TABLE [Reaction] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL,
  [ImageLocation] nvarchar(255) NOT NULL
)

CREATE TABLE [PostReaction] (
  [Id] integer PRIMARY KEY IDENTITY,
  [PostId] integer NOT NULL,
  [ReactionId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT [FK_PostReaction_Post] FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id]),
  CONSTRAINT [FK_PostReaction_Reaction] FOREIGN KEY ([ReactionId]) REFERENCES [Reaction] ([Id]),
  CONSTRAINT [FK_PostReaction_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

set identity_insert [Reaction] on

insert into Reaction (Id, Name, ImageLocation) values (1, 'cat', 'https://image.shutterstock.com/image-photo/funny-cat-ophthalmologist-appointmet-squinting-260nw-598805597.jpg' );
insert into Reaction (Id, Name, ImageLocation) values (2, 'dog', 'https://image.shutterstock.com/image-photo/indy-musician-guitarist-pug-dogfunny-260nw-688080844.jpg' );
insert into Reaction (Id, Name, ImageLocation) values (3, 'thumbsUp', 'https://www.flaticon.com/svg/static/icons/svg/1170/1170168.svg' );
insert into Reaction (Id, Name, ImageLocation) values (4, 'wiseGuy','https://pbs.twimg.com/profile_images/1020696791019290624/DT9Dzp8d_400x400.jpg');
insert into Reaction (Id, Name, ImageLocation) values (5, 'kissingMonkey','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQkhfxeOs4e6LXXTPWJorAczqWo5FqXIc_DQ&usqp=CAU');
insert into Reaction (Id, Name, ImageLocation) values (6, 'laughingChimp','https://specials-images.forbesimg.com/imageserve/5e3ac4eaa854780006b07efb/960x0.jpg?fit=scale');
insert into Reaction (Id, Name, ImageLocation) values (6, 'shockedSeal','https://i.insider.com/5c8045a6d2ce7802a110ce92?width=1100&format=jpeg&auto=webp');
set identity_insert [Reaction] off

set identity_insert [PostReaction] on

insert into PostReaction (Id, PostId, ReactionId, UserProfileId) values (1, 1, 1, 3);
insert into PostReaction (Id, PostId, ReactionId, UserProfileId) values (2, 1, 2, 3);
insert into PostReaction (Id, PostId, ReactionId, UserProfileId) values (3, 1, 3, 3);
insert into PostReaction (Id, PostId, ReactionId, UserProfileId) values (4, 1, 3, 5);
insert into PostReaction (Id, PostId, ReactionId, UserProfileId) values (5, 1, 3, 3);
insert into PostReaction (Id, PostId, ReactionId, UserProfileId) values (6, 2, 3, 2);
insert into PostReaction (Id, PostId, ReactionId, UserProfileId) values (7, 2, 3, 5);





set identity_insert [PostReaction] off