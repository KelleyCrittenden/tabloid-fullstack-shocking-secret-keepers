Use [Tabloid]
Go

set identity_insert [Reaction] on

insert into Reaction (Id, Name, ImageLocation) values (1, 'cat', 'https://image.shutterstock.com/image-photo/funny-cat-ophthalmologist-appointmet-squinting-260nw-598805597.jpg' );
insert into Reaction (Id, Name, ImageLocation) values (2, 'dog', 'https://image.shutterstock.com/image-photo/indy-musician-guitarist-pug-dogfunny-260nw-688080844.jpg' );

set identity_insert [Reaction] off

set identity_insert [PostReaction] on

insert into PostReaction (Id, PostId, ReactionId, UserProfileId) values (1, 1, 1, 3);
insert into PostReaction (Id, PostId, ReactionId, UserProfileId) values (2, 1, 2, 3);
set identity_insert [PostReaction] off