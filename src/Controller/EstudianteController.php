<?php

namespace App\Controller;

use App\Entity\Estudiante;
use App\Repository\EstudianteRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/estudiantes")
 */
class EstudianteController extends AbstractController
{
    /**
     * @Route("/{reactRoute}", name="estudiantes", methods={"GET"})
     */
    public function index(EstudianteRepository $estudianteRepository): Response
    {
        $em = $this->getDoctrine()->getManager();
        $estudiante = $em->getRepository(Estudiante::class)->findAll();
        $estudianteRepository = $em->getRepository(Estudiante::class)->findAll();
        return $this->render('estudiante/index.html.twig', array('findAll'=>$estudiante,'findAll'=>$estudianteRepository));
        
    }

    /**
     * @Route("/{reactRoute}/{update}", name="estudiante_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $estudiante = new Estudiante();
        $form = $this->createForm(Estudiante::class, $estudiante);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($estudiante);
            $entityManager->flush();

            return $this->redirectToRoute('estudiantes');
        }

        
    }

    /**
     * @Route("/{id}", name="estudiante_show", methods={"GET"})
     */
    public function show(Estudiante $estudiante): Response
    {
        return $this->render('estudiante/show.html.twig', [
            'estudiante' => $estudiante,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="estudiante_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Estudiante $estudiante): Response
    {
        $form = $this->createForm(EstudianteType::class, $estudiante);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('estudiantes');
        }

        return $this->render('estudiante/edit.html.twig', [
            'estudiante' => $estudiante,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="estudiante_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Estudiante $estudiante): Response
    {
        if ($this->isCsrfTokenValid('delete'.$estudiante->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($estudiante);
            $entityManager->flush();
        }

        return $this->redirectToRoute('estudiantes');
    }

    /**
     * @Route("/estudiantes/{idElemento}", name="Estudiantes")
     */
    public function Busquedas($idElemento)
    {
        $em = $this->getDoctrine()->getManager();
        $estudiante = $em->getRepository(Estudiante::class)->findAll();
        $elemento = $em->getRepository(Estudiante::class)->find(2);
        $elemento2 = $em->getRepository(Estudiante::class)->findOneBy(['codigo'=>'191161']);
        $elementoRepository = $em->getRepository(Estudiante::class)->BuscarElementoPorId($idElemento);
        return $this->render('estudiante/index.html.twig', array('find'=>$elemento, 'findOneBy'=>$elemento2, 'findAll'=>$estudiante,'BuscarElementoPorId'=>$elementoRepository));
    }
}
