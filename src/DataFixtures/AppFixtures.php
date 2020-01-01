<?php

namespace App\DataFixtures;

use App\Entity\Invoice;
use App\Entity\Trainee;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    /**
     * AppFixtures constructor.
     * @param $encoder
     */
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }


    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');


        for ($h = 0; $h < 15; $h++) {
            $user = new User();

            $chrono = 1;

            $hash = $this->encoder->encodePassword($user, "password");

            $user->setFirstName($faker->firstName())
                ->setLastName($faker->lastName)
                ->setEmail($faker->email)
                ->setPassword($hash);
            $manager->persist($user);

            for ($i = 0; $i < mt_rand(10, 50); $i++) {
                $trainee = new Trainee();
                $trainee->setFirstName($faker->firstName())
                    ->setLastName($faker->lastName)
                    ->setCompany($faker->company)
                    ->setEmail($faker->email)
                    ->setUser($user);

                $manager->persist($trainee);

                for ($j = 0; $j < mt_rand(3, 10); $j++) {
                    $invoice = new Invoice();
                    $invoice->setAmount($faker->randomFloat(2, 1500, 20000))
                        ->setSentAt($faker->dateTimeBetween('-6 months'))
                        ->setStatus($faker->randomElement(['SENT', 'PAID', 'CANCELLED']))
                        ->setTrainee($trainee)
                        ->setChrono($chrono);

                    $chrono++;

                    $manager->persist($invoice);
                }
            }
        }

        $manager->flush();
    }
}
