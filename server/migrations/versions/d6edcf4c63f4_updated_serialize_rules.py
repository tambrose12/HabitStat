"""updated serialize rules

Revision ID: d6edcf4c63f4
Revises: 0249885e7fad
Create Date: 2023-04-27 14:53:58.741234

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd6edcf4c63f4'
down_revision = '0249885e7fad'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('_alembic_tmp_habits')
    with op.batch_alter_table('habits', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('category',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('goal',
               existing_type=sa.INTEGER(),
               nullable=False)

    with op.batch_alter_table('habitstats', schema=None) as batch_op:
        batch_op.alter_column('created_at',
               existing_type=sa.DATETIME(),
               nullable=False,
               existing_server_default=sa.text('(CURRENT_TIMESTAMP)'))
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('habit_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('habitstats', schema=None) as batch_op:
        batch_op.alter_column('habit_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('created_at',
               existing_type=sa.DATETIME(),
               nullable=True,
               existing_server_default=sa.text('(CURRENT_TIMESTAMP)'))

    with op.batch_alter_table('habits', schema=None) as batch_op:
        batch_op.alter_column('goal',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('category',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=True)

    op.create_table('_alembic_tmp_habits',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=False),
    sa.Column('category', sa.VARCHAR(), nullable=False),
    sa.Column('goal', sa.INTEGER(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
