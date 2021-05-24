"""empty message

Revision ID: 01b8f6ece222
Revises: 0dc5ea9cbaa2
Create Date: 2021-05-24 15:06:40.017059

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '01b8f6ece222'
down_revision = '0dc5ea9cbaa2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('profileId', sa.Integer(), nullable=True),
    sa.Column('movieId', sa.Integer(), nullable=True),
    sa.Column('upvoteDownvote', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['movieId'], ['movies.id'], ),
    sa.ForeignKeyConstraint(['profileId'], ['profiles.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    # ### end Alembic commands ###
