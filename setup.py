from setuptools import setup, find_packages


with open('requirements.txt') as f:
    requirements = f.read().splitlines()

with open('README.md') as f:
    readme = f.read()


setup(
    name='YourDiscord',
    author='justinoboyle',
    url='https://github.com/justinoboyle/YourDiscord',
    version='0.1.0',
    license='MIT',
    description='Adds custom CSS and JavaScript support to Discord. (Fork of BeautifulDiscord)',
    long_description=readme,
    packages=find_packages(),
    install_requires=requirements,
    include_package_data=True,
    entry_points={'console_scripts': ['yourdiscord=yourdiscord.app:main']}
)
